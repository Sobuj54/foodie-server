import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.mjs";
import {
  createMyRestaurant,
  getMyRestaurant,
  updateMyRestaurant,
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
router.put(
  "/",
  upload.single("image"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  updateMyRestaurant
);

export default router;
