import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

const initMiddlewares = (app: Express) => {
  if (process.env.NODE_ENV == "production") {
    app.use(morgan("combined"));
  } else {
    app.use(morgan("dev"));
  }

  app.use(express.json({ limit: "1mb" }));

  app.use(limiter);

  // const allowedOrigins = [
  //   "https://st.admin.revesh.com",
  //   "https://st.revesh.com",
  //   "https://api.st.revesh.com",
  //   "https://api.email.revesh.com"
  // ];

  // if (process.env.NODE_ENV === "development") {
  //   allowedOrigins.push("http://localhost:3000");
  //   allowedOrigins.push("http://localhost:8888");
  // }

  app.use(
    cors({
      // origin: (origin, callback) => {
      //   if (!origin || allowedOrigins.includes(origin)) {
      //     callback(null, true);
      //   } else {
      //     console.log("origin not allowed:", origin);
      //     callback(new Error("Not allowed by CORS"));
      //   }
      // },
      origin: true,
      credentials: true,
    })
  );
};

export default initMiddlewares;
