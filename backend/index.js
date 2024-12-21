import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoute.js"; // Add `.js` to the import

// Initialize dotenv
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Environment variables
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

// Connect to MongoDB
mongoose
  .connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true }) // Recommended options
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => console.error("MongoDB connection error:", error));

// Define routes
app.use("/api", route);
