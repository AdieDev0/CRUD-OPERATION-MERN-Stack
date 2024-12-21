import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure uniqueness
  },
  address: {
    type: String,
    required: true,
  },
});

// Export the model as default
const User = mongoose.model("User", userSchema);
export default User;
