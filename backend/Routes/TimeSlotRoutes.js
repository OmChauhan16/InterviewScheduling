import express from "express";
import { getTimeSlots, addTimeSlot, deleteTimeSlot } from "../controllers/TimeSlotController.js";
import { loginHR } from "../Controllers/LoginController.js";
const router = express.Router();

// Routes for time slots
router.get("/timeslots", getTimeSlots);
router.post("/timeslots", addTimeSlot);
router.delete("/timeslots/:id", deleteTimeSlot);
router.delete("/login", loginHR);

export default router;
