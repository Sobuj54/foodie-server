import { Router } from "express";
import { healthCheck } from "../controller/health.controller.mjs";

const router = Router();

router.get("/", healthCheck);

export default router;
