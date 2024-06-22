import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import coins from "./coins";

const v1Router = () => {
  const router = Router();

  router.use("/coins", coins);

  router.use("*", (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({
      status: "error",
      message: "Not Found",
    });
  });

  return router;
};

export default v1Router;
