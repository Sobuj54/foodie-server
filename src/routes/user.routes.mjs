import { Router } from "express";
import {
  createUser,
  getCurrentUser,
  updateUser,
} from "../controller/user.controller.mjs";
import { jwtCheck, jwtParse } from "../middlewares/auth.middleware.mjs";
import validateUserRequest from "../middlewares/validation.middleware.mjs";

const router = Router();

router.get("/", jwtCheck, jwtParse, getCurrentUser);
router.post("/create-user", jwtCheck, createUser);
router.put("/update-user", jwtCheck, jwtParse, validateUserRequest, updateUser);

export default router;
