// import TimeSlot from "../Models/timeSlot.js";
import TimeSlot from "../models/TimeSlot.js";

// Get all time slots
export const getTimeSlots = async (req, res) => {
  try {
    const slots = await TimeSlot.find();
    res.status(200).json(slots);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch time slots" });
  }
};

// Add a new time slot
export const addTimeSlot = async (req, res) => {
  const { date, time, candidate,title } = req.body;


  // Check for overlapping time slots
  const existingSlot = await TimeSlot.findOne({ date, time });
  if (existingSlot) {
    return res.status(400).json({ error: "Time slot already exists" });
  }

  try {
    const newSlot = new TimeSlot({ date, time, candidate, title });
    
    const savedSlot = await newSlot.save();
    res.status(201).json(savedSlot);
  } catch (err) {
    res.status(500).json({ error: "Failed to create time slot" });
  }
};

// Delete a time slot
export const deleteTimeSlot = async (req, res) => {
  const { id } = req.params;
  try {
    await TimeSlot.findByIdAndDelete(id);
    res.status(200).json({ message: "Time slot deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete time slot" });
  }
};
