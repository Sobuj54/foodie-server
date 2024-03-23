import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.mjs";
import { createMyRestaurant } from "../controller/restaurant.controller.mjs";
import { jwtCheck, jwtParse } from "../middlewares/auth.middleware.mjs";
import { validateMyRestaurantRequest } from "../middlewares/validation.middleware.mjs";

const router = Router();

router.post(
  "/create",
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  upload.single("image"),
  createMyRestaurant
);

export default router;
