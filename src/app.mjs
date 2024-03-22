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
import healthCheck from "./routes/health.routes.mjs";
import restaurantRouter from "./routes/restaurant.routes.mjs";

app.use("/api/v1/users", userRouter);
app.use("/health", healthCheck);
app.use("/api/v1/restaurant", restaurantRouter);

export default app;
