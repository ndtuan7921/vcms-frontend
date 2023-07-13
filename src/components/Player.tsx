import React from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";

function Player({ url, playerRef, ...props }) {
  return <ReactPlayer url={url} ref={playerRef} {...props} />;
}

export default Player;
