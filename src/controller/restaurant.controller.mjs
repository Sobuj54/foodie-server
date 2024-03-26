import mongoose from "mongoose";
import { Restaurant } from "../models/restaurant.model.mjs";
import uploadOnCloudinary from "../utils/cloudinary.mjs";

const createMyRestaurant = async (req, res) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });
    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "User restaurant already exists." });
    }

    const imgPath = req.file.path;
    const uploadResponse = await uploadOnCloudinary(imgPath);

    const restaurant = new Restaurant(req.body);
    restaurant.image = uploadResponse.url;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    await restaurant.save();

    return res.status(201).json(restaurant);
  } catch (error) {
    console.log("create restaurant err :", error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

const getMyRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    return res.status(201).json(restaurant);
  } catch (error) {
    console.log("get restaurant err:", error);
    return res.status(500).json({ message: "Restaurant fetch failed." });
  }
};

const updateMyRestaurant = async (req, res) => {
  try {
    const {
      restaurantName,
      city,
      country,
      deliveryPrice,
      estimatedDeliveryTime,
      cuisines,
      menuItems,
    } = req.body;
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    restaurant.restaurantName = restaurantName;
    restaurant.city = city;
    restaurant.country = country;
    restaurant.deliveryPrice = deliveryPrice;
    restaurant.estimatedDeliveryTime = estimatedDeliveryTime;
    restaurant.cuisines = cuisines;
    restaurant.menuItems = menuItems;

    if (req.file) {
      const uploadedImg = await uploadOnCloudinary(req.file.path);
      restaurant.image = uploadedImg.url;
    }

    await restaurant.save();
    return res.status(200).json(restaurant);
  } catch (error) {
    console.log("update restaurant err:", error);
    return res.status(500).json({ message: "Restaurant update failed." });
  }
};

export { createMyRestaurant, getMyRestaurant, updateMyRestaurant };
