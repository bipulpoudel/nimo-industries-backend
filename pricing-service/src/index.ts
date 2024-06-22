import express from "express";
import "dotenv/config";
import ServerlessHttp from "serverless-http";

import initMiddlewares from "./middlewares";
import baseRouter from "./routes";

const port = process.env.PORT || 8000;

const getApp = async () => {
  const app = express();

  await initMiddlewares(app);

  app.use("/api", baseRouter());

  return app;
};

// Export the handler for AWS Lambda
const handler = async (event: any, context: any) => {
  const app = await getApp();
  const serverlessHandler = ServerlessHttp(app);
  return serverlessHandler(event, context);
};

export { handler };
