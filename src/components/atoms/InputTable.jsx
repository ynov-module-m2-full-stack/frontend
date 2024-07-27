import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addEvent, updateEvent } from "../../utilities/eventSlice";
import {
  extractTimeFromSqlDate,
  parseDateObjectToDateSql,
} from "../../utilities/fonctions";
function InputTable(props) {
  const dispatch = useDispatch();
  console.log(props.event);
  const [startTime, setStartTime] = useState(
    props.type === "update"
      ? extractTimeFromSqlDate(props.event.start) // Extract time from "date" property
      : ""
  );

  const [endTime, setEndTime] = useState(
    // Assuming endTime is not included in "date", provide an empty string by default
    props.type === "update" ? "" : ""
  );

  const [startDate, setStartDate] = useState(
    props.type === "update"
      ? parseDateObjectToDateSql(props.event.start) // Convert "date" to Date object
      : new Date() // Default date for new events (optional)
  );

  const [endDate, setEndDate] = useState(
    // Assuming endDate is not included, leave it empty by default
    props.type === "update" ? "" : ""
  );

  const [title, setTitle] = useState(
    props.type === "update" ? props.event.title : ""
  );

  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const titleRef = useRef(null);

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const validateControl = (controlRef) => {
    if (!controlRef.current.value) {
      controlRef.current.classList.add("invalid");
      return false;
    } else {
      controlRef.current.classList.remove("invalid");
      return true;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const isValid =
      validateControl(startTimeRef) &&
      validateControl(endTimeRef) &&
      validateControl(startDateRef) &&
      validateControl(endDateRef) &&
      validateControl(titleRef);

    if (isValid) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      // Extract year, month, and day components for both dates
      const startYear = startDateObj.getFullYear();
      const startMonth = startDateObj.getMonth();
      const startDay = startDateObj.getDate();
      const endYear = endDateObj.getFullYear();
      const endMonth = endDateObj.getMonth();
      const endDay = endDateObj.getDate();

      // Create combined datetime objects
      const startDateTime = new Date(
        startYear,
        startMonth,
        startDay,
        ...startTime.split(":")
      );
      const endDateTime = new Date(
        endYear,
        endMonth,
        endDay,
        ...endTime.split(":")
      );

      const eventData = {
        title,
        startDate: startDateTime, // Convert to Date object
        endDate: endDateTime, // Convert to Date object
      };

      if (props.type == "post") {
        dispatch(addEvent(eventData)); // Example: dispatch(addEvent(eventData))
      } else {
        dispatch(updateEvent(eventData));
      }
      // Clear the form after successful submission (optional)
      setStartTime("");
      setEndTime("");
      setStartDate("");
      setEndDate("");
      setTitle("");
    } else {
      console.error("Form submission failed due to invalid data");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <table style={{ border: "none", width: "100%" }}>
        <tbody>
          <tr>
            <td style={{ paddingRight: "10px" }}>
              <label htmlFor="startTime">Start Time:</label>
            </td>
            <td>
              <input
                type="time"
                id="startTime"
                value={startTime}
                onChange={handleStartTimeChange}
                ref={startTimeRef}
              />
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: "10px" }}>
              <label htmlFor="endTime">End Time:</label>
            </td>
            <td>
              <input
                type="time"
                id="endTime"
                value={endTime}
                onChange={handleEndTimeChange}
                ref={endTimeRef}
              />
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: "10px" }}>
              <label htmlFor="startDate">Start Date (YYYY-MM-DD):</label>
            </td>
            <td>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={handleStartDateChange}
                ref={startDateRef}
              />
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: "10px" }}>
              <label htmlFor="endDate">End Date (YYYY-MM-DD):</label>
            </td>
            <td>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={handleEndDateChange}
                ref={endDateRef}
              />
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: "10px" }}>
              <label htmlFor="title">Title:</label>
            </td>
            <td>
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
                ref={titleRef}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit">Submit</button>
    </form>
  );
}

export default InputTable;
