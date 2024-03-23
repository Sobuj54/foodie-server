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

export { createMyRestaurant };
