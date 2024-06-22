import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import v1Router from "./v1";

const baseRouter = () => {
  const router = Router();

  router.use("/v1", v1Router());

  router.use("*", (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({
      status: "error",
      message: "Not Found",
    });
  });

  return router;
};

export default baseRouter;
