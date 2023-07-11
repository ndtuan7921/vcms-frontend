import { Uppy } from "@uppy/core";
import { Dashboard } from "@uppy/react";
import Tus from "@uppy/tus";
import React, { Dispatch, SetStateAction } from "react";

const TUS_ENDPOINT = "https://tusd.tusdemo.net/files/";
const XHR_ENDPOINT =
  "https://f00f-2402-800-6294-49cf-a950-8036-cd58-6cd5.ngrok-free.app/upload";

const uppy = new Uppy({
  debug: true,
  autoProceed: true,
  restrictions: {
    maxNumberOfFiles: 1,
    allowedFileTypes: ["video/*"],
  },
}).use(Tus, {
  endpoint: TUS_ENDPOINT,
  //   allowedMetaFields: ["name", "id", "author"],
});

interface UploaderProps {
  handleUpload: Dispatch<SetStateAction<boolean>>;
}

function Uploader(props: UploaderProps) {
  const { handleUpload } = props;

  uppy.on("file-added", (file) => {
    console.log("file-added\t", file);
    Object.assign(file);
  });

  uppy.on("complete", ({ successful, failed }) => {
    console.log("successful\t", successful);
    console.log("failed\t", failed);
  });

  uppy.on("upload-success", () => {
    handleUpload(true);
  });

  uppy.on("file-removed", (file, reason) => {
    handleUpload(false);
  });

  return (
    <Dashboard
      uppy={uppy}
      //   hideUploadButton
      proudlyDisplayPoweredByUppy={false}
    />
  );
}

export default Uploader;
