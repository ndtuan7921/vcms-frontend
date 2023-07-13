import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "../src/Link";
import ProTip from "../src/ProTip";
import Copyright from "../src/Copyright";
import Header from "../src/components/Header";
import VideoCard from "../src/components/VideoCard";
import TimePicker from "../src/components/TimePicker";
import { host } from "../env.config";

export default function Home() {
  const handleTimeChange = (newTime) => {
    // Perform any logic with the selected time
    console.log("Selected time:", newTime);
  };
  fetch(`${host}/api/videos`)
    .then((res) => res.json())
    .then((res) => console.log(res));
  return (
    <>
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        {/* <TimePicker onTimeChange={handleTimeChange} /> */}
      </Box>
    </>
  );
}
