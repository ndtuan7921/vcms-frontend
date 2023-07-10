import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

const VideoPlayer = () => {
  const playerRef = useRef<any>(null);
  let newURL;
  useEffect(() => {
    // Lấy đường link m3u8 từ nguồn dữ liệu hoặc người dùng
    const m3u8Url =
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8";

    // Thực hiện xử lý FFmpeg để chèn thông tin vào video
    const processVideo = async () => {
      // Import và khởi tạo FFmpeg
      const ffmpeg = createFFmpeg({
        log: true,
        mainName: "main",
        corePath:
          "https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js",
      });
      await ffmpeg.load();

      // Tải đường link m3u8 về dưới dạng blob
      const response = await fetch(m3u8Url);
      const videoData = await response.blob();
      console.log("video data: ", videoData);
      const videoPath = URL.createObjectURL(videoData);

      // Khởi tạo input và output cho FFmpeg
      ffmpeg.FS("writeFile", "input.mp4", await fetchFile(videoPath));

      // Chèn thông tin sản phẩm vào video
      const command = `-i input.mp4 -vf drawtext="text='Thông tin sản phẩm: [THÔNG TIN CỦA BẠN]':fontcolor=white:fontsize=24:x=10:y=10" -c:a copy output.mp4`;
      await ffmpeg.run(...command.split(" "));

      // Đọc file output từ FFmpeg
      const outputVideoData = ffmpeg.FS("readFile", "output.mp4");

      // Tạo đường link tạm thời cho video đã xử lý
      const outputVideoPath = URL.createObjectURL(
        new Blob([outputVideoData.buffer], { type: "video/mp4" })
      );

      newURL = outputVideoPath;

      // Cập nhật source của video player với video đã xử lý
      playerRef.current.load();
      playerRef.current?.seekTo(0);
      playerRef.current?.player.player.src({
        type: "video/mp4",
        src: outputVideoPath,
      });

      // Xóa các file tạm thời của FFmpeg
      ffmpeg.FS("unlink", "input.mp4");
      ffmpeg.FS("unlink", "output.mp4");

      // Giải phóng bộ nhớ của video gốc
      URL.revokeObjectURL(videoPath);
    };

    processVideo();
  }, []);

  return (
    <ReactPlayer
      ref={playerRef}
      url={newURL}
      controls
      width="640"
      height="360"
    />
  );
};

export default VideoPlayer;
