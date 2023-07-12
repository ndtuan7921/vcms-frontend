import { Box, Button, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import React, { createRef, useEffect, useRef, useState } from "react";
import BaseReactPlayer, {
  BaseReactPlayerProps,
  OnProgressProps,
} from "react-player/base";
import ProductAds from "../../src/components/ProductAds";
import ReactPlayer, { ReactPlayerProps } from "react-player";
// import ReactPlayer from "react-player";

const DynamicReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

const link =
  "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8";

function index() {
  const playerRef = useRef<any>();

  const handleButtonClick = (seconds: number) => {
    playerRef.current?.seekTo(seconds);
  };

  const handleOnPress = (state: OnProgressProps) => {};

  return (
    <>
      <Container maxWidth="xl">
        <Stack direction={"column"} spacing={4}>
          <Stack>
            <DynamicReactPlayer
              url={link}
              playing
              controls={true}
              ref={playerRef}
              onProgress={(state) => handleOnPress(state)}
              // onSeek={(state) => handleOnSeek(state)}
            />
            <Stack spacing={2}>
              <Typography variant="h4">Title</Typography>
              <Typography variant="body1">Description</Typography>
            </Stack>
          </Stack>
          <Button onClick={() => handleButtonClick(30)}>
            Play from 30 seconds
          </Button>

          {/* <ProductAds /> */}
        </Stack>
      </Container>
    </>
  );
}

export default index;
