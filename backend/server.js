import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import timeSlotRoutes from "./Routes/TimeSlotRoutes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI ;
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Use routes
app.use("/api", timeSlotRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Interview Scheduler API is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
