import { User } from "../models/user.model.mjs";

const createUser = async (req, res) => {
  try {
    const { auth0Id, email } = req.body;
    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      return res.status(200).json({ message: "user already exists." });
    }

    const newUser = await User.create({ auth0Id, email });
    return res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log("create user err:", error);
    return res.status(500).json({ message: "user creation failed." });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.country = country;
    user.city = city;

    await user.save();
    return res.status(201).send(user);
  } catch (error) {
    console.log("updateUser error: ", error);
    return res.status(500).json({ message: "user update failed." });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);
    if (!currentUser) {
      return res.status(404).json({ message: "user not found." });
    }

    return res.status(201).json(currentUser);
  } catch (error) {
    console.log("get user err:", error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

export { createUser, updateUser, getCurrentUser };
