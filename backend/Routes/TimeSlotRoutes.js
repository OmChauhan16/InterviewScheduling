import express from "express";
import { getTimeSlots, addTimeSlot, deleteTimeSlot } from "../Controllers/TimeSlotController.js";
const router = express.Router();

// Routes for time slots
router.get("/timeslots", getTimeSlots);
router.post("/timeslots", addTimeSlot);
router.delete("/timeslots/:id", deleteTimeSlot);

export default router;
