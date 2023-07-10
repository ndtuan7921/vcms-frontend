import UppyComponent from "../src/components/UppyComponent";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import insertProductInfo from "../src/utils/insertProductInfo";
import VideoPlayer from "../src/components/VideoPlayer";
import { OnProgressProps } from "react-player/base";

const productInfo = "product example info";

const link =
  "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8";

export default function Home() {
  const playerRef = useRef<any>(null);
  const [selectedQuality, setSelectedQuality] = useState(0);
  const [qualities, setQualities] = useState([]);

  useEffect(() => {
    const player = playerRef.current.getInternalPlayer("hls");

    if (player) {
      // Get the available quality levels
      const levels = player.levels || [];
      setQualities(levels);

      // Set the initial selected quality
      if (levels.length > 0) {
        player.currentLevel = selectedQuality;
      }
    }
  }, []);

  const handleQualityChange = (event: any) => {
    const newQuality = parseInt(event.target.value, 10);
    setSelectedQuality(newQuality);

    const player = playerRef.current.getInternalPlayer("hls");
    if (player) {
      player.currentLevel = newQuality;
    }
  };

  // const VideoWithProductInfo = ({ videoURL, productInfo }) => {
  //   const [updatedVideoURL, setUpdatedVideoURL] = useState("");

  //   useEffect(() => {
  //     const updateVideo = async () => {
  //       const updatedContent = await insertProductInfo(videoURL, productInfo);
  //       // Tạo URL mới từ nội dung đã chèn
  //       const updatedURL = URL.createObjectURL(
  //         new Blob([updatedContent], { type: "application/vnd.apple.mpegurl" })
  //       );
  //       setUpdatedVideoURL(updatedURL);
  //     };

  //     updateVideo();
  //   }, []);

  //   return <ReactPlayer url={updatedVideoURL} controls={true} />;
  // };
  const handleOnPress = (state: OnProgressProps) => {
    console.log(state);
    state.playedSeconds < 6 && console.log("tuanrider");
  };

  return (
    <>
      <ReactPlayer
        url={link}
        controls={true}
        ref={playerRef}
        onProgress={(state) => handleOnPress(state)}
      />
      <h1>Quality Controls</h1>
      <select value={selectedQuality} onChange={handleQualityChange}>
        {qualities.map((quality: any, index) => (
          <option key={index} value={index}>
            {quality.height}p
          </option>
        ))}
      </select>
      <UppyComponent />
      <h1>hello</h1>
      {/* <h1>hello</h1>
      <VideoPlayer /> */}
    </>
  );
}
