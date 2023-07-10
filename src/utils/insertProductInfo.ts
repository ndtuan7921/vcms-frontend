import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({
  log: true,
  mainName: "main",
  corePath: "https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js",
});

const insertProductInfo = async (videoURL: any, productInfo: any) => {
  // Tải file .m3u8 từ URL
  const response = await fetch(videoURL);

  const m3u8Content = await response.text();

  // Xác định vị trí để chèn nội dung (ví dụ: chèn vào cuối file)
  const insertIndex = m3u8Content.length;

  // Chèn nội dung vào file .m3u8
  const updatedM3u8Content =
    m3u8Content.slice(0, insertIndex) +
    "\n#EXT-X-CUSTOM-INFO:" +
    productInfo +
    m3u8Content.slice(insertIndex);

  // Lưu lại file .m3u8 (tùy thuộc vào yêu cầu của ứng dụng)
  // ...
  console.log("response\t", response);
  console.log("m3u8Content\t", m3u8Content);
  console.log("updatedM3u8Content\t", updatedM3u8Content);

  return updatedM3u8Content;
};

export default insertProductInfo;
