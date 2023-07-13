import { Box, Button, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";
// import ReactPlayer from "react-player";

const DynamicReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

const Player = dynamic(() => import("../../src/components/Player"), {
  ssr: false,
});

const link =
  "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8";

function index() {
  const playerRef = useRef<ReactPlayer>(null);
  // const [url, setUrl] = useState("");
  console.log(playerRef.current);
  const handleButtonClick = (seconds: number) => {
    playerRef?.current?.seekTo(seconds);
  };

  const handleOnPress = (state: OnProgressProps) => {};
  useEffect(() => {
    fetch(
      "https://9071-2402-800-6294-49cf-940c-2a9b-32cf-7ac.ngrok-free.app/api/videos/14dec9da-4f9a-4cf2-bd6e-e8453567aa17"
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        // setUrl(
        //   `https://9071-2402-800-6294-49cf-940c-2a9b-32cf-7ac.ngrok-free.app${res.manifestUrl}`
        // );
      });
  }, []);

  // console.log(url);
  const url =
    "https://9071-2402-800-6294-49cf-940c-2a9b-32cf-7ac.ngrok-free.app/manifests/thpt/thpt-manifest.m3u8";
  return (
    <>
      <Container maxWidth="xl">
        <Stack direction={"column"} spacing={4}>
          <Stack>
            <DynamicReactPlayer
              url={url}
              playing
              controls={true}
              onProgress={(state) => handleOnPress(state)}
              // onSeek={(state) => handleOnSeek(state)}
            />
            {/* <Player url={url} playerRef={playerRef} playing controls={true} /> */}
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
