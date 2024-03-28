import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.mjs";
import {
  createMyRestaurant,
  getMyRestaurant,
  searchRestaurant,
  updateMyRestaurant,
} from "../controller/restaurant.controller.mjs";
import { jwtCheck, jwtParse } from "../middlewares/auth.middleware.mjs";
import { validateMyRestaurantRequest } from "../middlewares/validation.middleware.mjs";
import { param } from "express-validator";

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

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City prameter must be a string"),
  searchRestaurant
);

export default router;
