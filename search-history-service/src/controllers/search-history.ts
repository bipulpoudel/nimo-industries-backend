import { Request, Response } from "express";
import * as Yup from "yup";
import { StatusCodes } from "http-status-codes";

import { SearchHistory } from "../entity";

const { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR } = StatusCodes;

//@desc    Get all search history of a user
//@route   GET /api/v1/search-history
//@access  Public
export const getSearchHistory = async (req: Request, res: Response) => {
  const { email, limit = 20, page = 1 } = req.query;

  try {
    //if email is provided, validate it
    if (email) {
      const schema = Yup.string().email("Email is not valid");
      await schema.validate(email, { abortEarly: false });
    }

    const query = await SearchHistory.createQueryBuilder("search_history");

    if (email) {
      query.where("search_history.email = :email", { email });
    }

    const searchHistory = await query
      .limit(Number(limit))
      .offset(Number(limit) * (Number(page) - 1))
      .orderBy("search_history.created_at", "DESC")
      .getMany();

    const count = await query.getCount();

    return res.status(OK).json({
      status: "success",
      message: "Search history fetched successfully",
      data: {
        search_histories: searchHistory,
        meta: {
          count,
        },
      },
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
