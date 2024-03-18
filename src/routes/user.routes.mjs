import { Router } from "express";
import { createUser } from "../controller/user.controller.mjs";

const router = Router();

router.post("/create-user", createUser);

export default router;
