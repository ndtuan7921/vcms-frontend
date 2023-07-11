import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "../src/Link";
import ProTip from "../src/ProTip";
import Copyright from "../src/Copyright";
import Header from "../src/components/Header";
import VideoCard from "../src/components/VideoCard";
import Video from "../src/components/Video";

export default function Home() {
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
        {/* <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard /> */}
        <Video />
      </Box>
    </>
  );
}
