import { Router } from "express";
import { createUser } from "../controller/user.controller.mjs";
import { jwtCheck } from "../middlewares/auth.middleware.mjs";

const router = Router();

router.post("/create-user", jwtCheck, createUser);

export default router;
