import wrapBaseEmail from "./base-email";

const getCoinPriceEmail = async ({
  coin,
  price,
  marketCap,
  priceChange24h,
  high24h,
  low24h,
}: {
  coin: string;
  price: string;
  marketCap: string;
  priceChange24h: string;
  high24h: string;
  low24h: string;
}) => {
  const mainContent = `<td class="content">
              <tr>
                <td>
                  <p>Hi there,</p>
                </td>
              </tr>

              <tr>
                <td>
                  <p>
                    You had recently search price for
                    <span style="font-weight: bold">"${coin}"</span> on our
                    website. This email is to give you a detailed information on
                    the price of ${coin}.
                  </p>
                </td>
              </tr>

              <tr>
                <td>
                  <p>
                    The current price of ${coin} is
                    <span style="font-weight: bold">${price}</span>.
                  </p>
                </td>
                 
                
                
                
              </tr>

              <tr>

              <td>
                  <p>
                    The lowest price in last 24 hours is
                    <span style="font-weight: bold">${low24h}</span>.
                  </p>
                </td>
                </tr>

              

              <tr>
                <td>
                  <p>
                    Last 24 hours change in price is
                    <span style="font-weight: bold">${priceChange24h}</span>.
                  </p>
                </td>
              </tr>

              <tr>
              <td>
                  <p>
                    The highest price in last 24 hours is
                    <span style="font-weight: bold">${high24h}</span>.
                  </p>
                </td>
              </tr>

              <tr>
              <td>
                  <p>
                    The total market cap of ${coin} is
                    <span style="font-weight: bold">${marketCap}</span>.
                  </p>
                </td>
              </tr>

              <tr>
                <td>
                  <a href="${coin}" class="button">
                    View more details
                  </a>
                </td>
              </tr>
            </td>
    `;

  const emailContent = await wrapBaseEmail({
    html: mainContent,
  });

  return emailContent;
};

export default getCoinPriceEmail;
