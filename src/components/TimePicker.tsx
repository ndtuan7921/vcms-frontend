import React from "react";
import { TextField } from "@mui/material";

const TimePicker = ({ onTimeChange }) => {
  const handleTimeChange = (event) => {
    const newTime = event.target.value;
    onTimeChange(newTime);
  };

  return (
    <TextField
      label="Time"
      type="time"
      inputProps={{
        step: 1, // Specifies 1-second intervals
      }}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        endAdornment: null, // Remove the clock icon
      }}
      value={null} // Use null as the initial value to prevent the default time value
      onChange={handleTimeChange}
    />
  );
};

export default TimePicker;
