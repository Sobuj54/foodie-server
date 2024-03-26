import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.mjs";
import {
  createMyRestaurant,
  getMyRestaurant,
} from "../controller/restaurant.controller.mjs";
import { jwtCheck, jwtParse } from "../middlewares/auth.middleware.mjs";
import { validateMyRestaurantRequest } from "../middlewares/validation.middleware.mjs";

const router = Router();

router.get("/", jwtCheck, jwtParse, getMyRestaurant);
router.post(
  "/create-restaurant",
  upload.single("image"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  createMyRestaurant
);

export default router;
