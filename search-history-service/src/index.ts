import express from "express";
import "dotenv/config";
import ServerlessHttp from "serverless-http";

import connectDB from "./bootstrap/db";

import baseRouter from "./routes";
import initMiddlewares from "./middlewares";
import { setupRabbitMQConsumer } from "./utils/rabbitmq";

const getApp = async () => {
  const app = express();

  await initMiddlewares(app);
  await connectDB();

  await setupRabbitMQConsumer();

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
