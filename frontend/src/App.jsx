import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import "./App.css";

const App = () => {
  const [date, setDate] = useState(new Date()); // Selected date
  const [timeSlots, setTimeSlots] = useState([]); 
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(""); // Selected time slot for a slot
  const [candidate, setCandidate] = useState(""); // Candidate name
  const [title, setTitle] = useState(""); // Title of the slot

  // Predefined time slots
  const predefinedTimeSlots = [
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
  ];

  const host = 'https://interviewschedulingbackend.onrender.com';

  // Fetch existing time slots from API
  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const response = await axios.get("${host}/api/timeslots");
        setTimeSlots(response.data);
      } catch (error) {
        console.error("Error fetching time slots:", error);
      }
    };
    fetchTimeSlots();
  }, []);

  // Create a new time slot
  const handleAddTimeSlot = async () => {
    if (!selectedTimeSlot || !candidate || !title) {
      alert("Please select a time slot, enter a candidate name, and provide a title.");
      return;
    }

    const newSlot = {
      date: date.toISOString().split("T")[0],
      time: selectedTimeSlot, // Use the selected time range
      candidate,
      title,
    };

    try {
      const response = await axios.post(
        "${host}/api/timeslots",
        newSlot
      );
      setTimeSlots([...timeSlots, response.data]);
      alert("Time slot added successfully!");
      setSelectedTimeSlot("");
      setCandidate("");
      setTitle("");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle duplicate time slot error from backend
        alert(error.response.data.error || "This time slot is already taken.");
      } else {
        // Handle general errors
        console.error("Error adding time slot:", error);
        alert("Failed to add the time slot. Please try again.");
      }    }
  };

  // Delete a time slot
  const handleDeleteTimeSlot = async (id) => {
    try {
      await axios.delete(`${host}/api/timeslots/${id}`);
      setTimeSlots(timeSlots.filter((slot) => slot._id !== id));
      alert("Time slot deleted successfully!");
    } catch (error) {
      console.error("Error deleting time slot:", error);
    }
  };

  // Render time slots for the selected date
  const renderTimeSlots = () => {
    const slotsForDate = timeSlots.filter(
      (slot) => slot.date === date.toISOString().split("T")[0]
    );

    return slotsForDate.length > 0 ? (
      <div className="time-slot-grid">
        {slotsForDate.map((slot) => (
          <div key={slot._id} className="time-slot">
            <p><strong>{slot.timeSlot}</strong></p>
            <p>Title: {slot.title}</p>
            <p>Candidate's Name: {slot.candidate}</p>
            <p>Time Slot: {slot.time}</p>
            <button onClick={() => handleDeleteTimeSlot(slot._id)}>Delete</button>
          </div>
        ))}
      </div>
    ) : (
      <p>No slots for this date.</p>
    );
  };

  return (
    <div className="App">
      <h1>Interview Scheduler</h1>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} />
      </div>
      <h3>Selected Date: {date.toLocaleDateString()}</h3>
      <div>
        <label>
          Select Time Slot:{" "}
          <select id="select_time-slot"
            value={selectedTimeSlot}
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
          >
            <option value="">Select a Time Slot</option>
            {predefinedTimeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Title:{" "}
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Candidate Name:{" "}
          <input
            id="candidate_name"
            type="text"
            value={candidate}
            onChange={(e) => setCandidate(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleAddTimeSlot}>Add Time Slot</button>
      </div>
      <h4>Time Slots for {date.toLocaleDateString()}:</h4>
      {renderTimeSlots()}
    </div>
  );
};

export default App;
