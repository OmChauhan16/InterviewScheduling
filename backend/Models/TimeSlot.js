import mongoose from "mongoose";

// Define the schema for time slots
const timeSlotSchema = new mongoose.Schema({
  date: { type: String, required: true }, 
  time: { type: String, required: true }, 
  candidate: { type: String, required: true }, 
  title: { type: String, required: true }, 
});

// Create the model
const TimeSlot = mongoose.model("TimeSlot", timeSlotSchema);

export default TimeSlot;
