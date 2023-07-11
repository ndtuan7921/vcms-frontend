export const generateWebVTT = (captions: any[]) => {
  let webVTTContent = "WEBVTT\n\n";

  captions.forEach((caption, index) => {
    const startTime = caption.startTime;
    const endTime = caption.endTime;
    const text = caption.text;

    webVTTContent += `${index + 1}\n`;
    webVTTContent += `${formatTime(startTime)} --> ${formatTime(endTime)}\n`;
    webVTTContent += `${text}\n\n`;
  });

  return webVTTContent;
};

const formatTime = (time: any) => {
  const pad = (num: any) => ("0" + num).slice(-2);
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.000`;
};
