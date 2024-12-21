import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";
import colors from "colors";

// Initialize dotenv
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Use built-in Express JSON parser

// Environment variables
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

// Connect to MongoDB
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log(colors.bgBrightGreen("Connected to MongoDB"));
    app.listen(PORT, () => {
      console.log(colors.bgBrightCyan(`Server is running on port: ${PORT}`));
    });
  })
  .catch((error) => {
    console.error(
      colors.bgBrightRed(`MongoDB connection error: ${error.message}`)
    );
  });

// Define routes
app.use("/api", route);
