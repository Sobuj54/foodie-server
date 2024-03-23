import { body, validationResult } from "express-validator";

const handleValidationErrors = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
};

export const validateUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("AddressLine1 must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("country")
    .isString()
    .notEmpty()
    .withMessage("Country  must be a string"),
  handleValidationErrors,
];

export const validateMyRestaurantRequest = [
  body("restaurantName")
    .isString()
    .notEmpty()
    .withMessage("Restaurant Name is required."),
  body("city").isString().notEmpty().withMessage("City is required."),
  body("country").isString().notEmpty().withMessage("Country is required."),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery price must be positive."),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery price must be positive."),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated delivery time must be positive."),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be an array.")
    .not()
    .isEmpty()
    .withMessage("Cuisines array can not be empty."),
  body("menuItems").isArray().withMessage("Menu items must be an array."),
  body("menuItems.*.name").isEmpty().withMessage("Menu item name is required."),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu item price is required and it must be positive."),
  handleValidationErrors,
];
