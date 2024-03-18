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

export { createUser };
