import { Request, Response } from "express";
import * as Yup from "yup";
import { StatusCodes } from "http-status-codes";

import { CoinGecko, MailerSend, RabbitMQ } from "../../services";
import { QUEUES } from "../../enums";
import { getCoinPriceEmail } from "../../services/emails";
import { formatCurrency } from "../../utils";

const { BAD_REQUEST, CREATED, OK, NOT_FOUND, CONFLICT, INTERNAL_SERVER_ERROR } =
  StatusCodes;

//@desc    Get price of a coin and send email back to investor
//@route   POST /api/v1/coins/price?coin_id={coin_id}&email={email}
//@access  Public
export const getPrice = async (req: Request, res: Response) => {
  const { coin, email } = req.query;

  try {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required("Email is required for this request"),
      coin: Yup.string().required("Coin ID is required for this request"),
    });

    await schema.validate({ email, coin }, { abortEarly: false });

    const coinMarketData = await CoinGecko.getCoinMarketData(coin as string);

    if (!coinMarketData) {
      return res.status(NOT_FOUND).json({
        status: "error",
        message: "Coin not found with the provided coin ID",
      });
    }

    console.log("Coin Market Data: ", coinMarketData);

    const emailHtml = await getCoinPriceEmail({
      coin: coinMarketData.name,
      price: formatCurrency(Number(coinMarketData.current_price)),
      marketCap: formatCurrency(Number(coinMarketData.market_cap)),
      priceChange24h: formatCurrency(Number(coinMarketData.price_change_24h)),
      high24h: formatCurrency(Number(coinMarketData.high_24h)),
      low24h: formatCurrency(Number(coinMarketData.low_24h)),
    });

    //send email to investor
    await MailerSend.sendEmail({
      toEmail: email as string,
      emailSubject: `Price of ${coinMarketData.name} found!`,
      emailHtml,
    });

    //save search history in search-history-service
    await RabbitMQ.sendMessagetoQueue({
      queueName: QUEUES.SearchHistoryQueue,
      data: {
        email,
        searched_coin: coin,
      },
    });

    return res.status(OK).json({
      status: "success",
      message: "Email sent successfully",
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Yup.ValidationError) {
      return res.status(BAD_REQUEST).json({
        status: "error",
        message: error.errors.join(", "),
      });
    }

    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
