import { useState } from "react";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import XHRUpload from "@uppy/xhr-upload";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
// import Dashboard from "@uppy/dashboard";
import { Typography } from "@mui/material";
import { Dashboard, ProgressBar } from "@uppy/react";

const UPLOADER: "tus" | "xhr" = "xhr";
const TUS_ENDPOINT = "https://tusd.tusdemo.net/files/";
const XHR_ENDPOINT =
  "https://f00f-2402-800-6294-49cf-a950-8036-cd58-6cd5.ngrok-free.app/upload";

const uppy = new Uppy({
  debug: true,
  autoProceed: false,
  restrictions: {
    maxNumberOfFiles: 1,
    allowedFileTypes: ["video/*"],
  },
}).use(Tus, {
  endpoint: XHR_ENDPOINT,
  allowedMetaFields: ["name", "id", "author"],
  metadata: {
    author: "tuannd",
  },
});
// .use(XHRUpload, {
//   endpoint: XHR_ENDPOINT,
//   // limit: 3,
//   // bundle: true,
//   // fieldName: "video",
//   // formData: true,
// });

const UppyComponent = () => {
  const [urls, setUrls] = useState<any>([]);

  // switch (UPLOADER) {
  //   case "tus":
  //     uppy.use(Tus, { endpoint: TUS_ENDPOINT, limit: 6 });
  //     break;

  //   case "xhr":
  //     uppy.use(XHRUpload, {
  //       endpoint: XHR_ENDPOINT,
  //       limit: 3,
  //       bundle: true,
  //     });
  //     break;
  // }

  uppy.on("file-added", (file) => {
    console.log(file);
    Object.assign(file, { author: "tuannd" });
  });

  uppy.on("upload", (data) => {
    console.log(`Starting upload ${data.id} for files ${data.fileIDs}`);
  });

  uppy.on("progress", (progress) => {
    // progress: integer (total progress percentage)
    // console.log(progress);
  });

  uppy.on("complete", ({ successful, failed }) => {
    console.log("successful\t", successful);
    console.log("failed\t", failed);

    // setUrls(
    //   successful.map(({ id, name, uploadURL }) => ({
    //     id,
    //     name,
    //     uploadURL,
    //   }))
    // );
    setUrls([...urls, ...successful]);
  });

  uppy.on("upload-success", (file, response) => {
    console.log("upload-success ", file, "\t", response);
    // const img = new Image();
    // img.width = 300;
    // img.alt = file.id;
    // img.src = response.uploadURL;
    // document.body.appendChild(img);
  });

  //   const onClickUpload = (event: any) => {
  //     event.preventDefault();
  //     uppy.upload();
  //   };
  console.log("URLs:\n", urls);
  return (
    <>
      {/* <ProgressBar uppy={uppy} /> */}
      <Dashboard uppy={uppy} showProgressDetails={true} />

      {urls.map((file: any) => (
        <Typography
          key={file.id}
          variant="h6"
          component="h6"
          align="center"
          gutterBottom
        >
          {/* <Link href={url} target="_blank" rel="noopener"> */}
          {file.name}
          {/* </Link> */}
        </Typography>
      ))}
    </>
  );
};
export default UppyComponent;

// ngrok
// https://7535-2402-800-6294-49cf-a950-8036-cd58-6cd5.ap.ngrok.io/upload
