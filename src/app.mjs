import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import userRouter from "./routes/user.routes.mjs";

app.use("/api/v1/users", userRouter);

export default app;
