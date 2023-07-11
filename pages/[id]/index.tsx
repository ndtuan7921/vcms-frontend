import { Box, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useRef } from "react";
import { OnProgressProps } from "react-player/base";
// import ReactPlayer from "react-player";

const DynamicReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

const link =
  "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8";

function index() {
  const playerRef = useRef<any>(null);

  const handleOnPress = (state: OnProgressProps) => {
    // console.log(state);
    // state.playedSeconds < 6 && console.log("tuanrider");
  };
  return (
    <>
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <DynamicReactPlayer
            url={link}
            controls={true}
            ref={playerRef}
            onProgress={(state) => handleOnPress(state)}
          />

          {/* <h1>hello</h1> */}
        </Box>
        <Stack>
          <Typography variant="h4">Title</Typography>
          <Typography variant="body1">Description</Typography>
        </Stack>
      </Container>
    </>
  );
}

export default index;
