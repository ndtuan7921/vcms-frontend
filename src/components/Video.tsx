import React from "react";
import { generateWebVTT } from "../utils";
import dynamic from "next/dynamic";
const DynamicReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});
const link =
  "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8";

function Video() {
  const captions = [
    { startTime: 0, endTime: 5, text: "Caption 1" },
    { startTime: 7, endTime: 10, text: "Caption 2" },
    // Add more captions as needed
  ];

  const webVTTContent = generateWebVTT(captions);
  console.log(webVTTContent);
  return (
    <div>
      <h1>Video Player</h1>
      <DynamicReactPlayer
        url={link}
        controls
        width="640px"
        height="360px"
        config={{
          file: {
            attributes: {
              crossOrigin: "anonymous",
            },
            // tracks: [
            //   {
            //     kind: "subtitles",
            //     src: demoVtt,
            //     srcLang: "en",
            //     default: true,
            //     label: "",
            //   },
            // ],
          },
        }}
      />
    </div>
  );
}

export default Video;
