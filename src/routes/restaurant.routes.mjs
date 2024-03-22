import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.mjs";
import { createMyRestaurant } from "../controller/restaurant.controller.mjs";

const router = Router();

router.post("/", upload.single("image"), createMyRestaurant);

export default router;
