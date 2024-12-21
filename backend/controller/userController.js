import User from "../model/userModel.js";

// CREATE
export const create = async (req, res) => {
  try {
    const { name, email, address } = req.body;

    // Validate input
    if (!name || !email || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create and save new user
    const newUser = new User({ name, email, address });
    const savedData = await newUser.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "User data not found" });
    }

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
