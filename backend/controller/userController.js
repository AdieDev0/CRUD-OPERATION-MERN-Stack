import User from "../model/userModel.js";

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
