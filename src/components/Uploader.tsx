import { Uppy, UppyFile } from "@uppy/core";
import { Dashboard } from "@uppy/react";
import Tus from "@uppy/tus";
import React, { Dispatch, SetStateAction } from "react";

const TUS_ENDPOINT = "https://tusd.tusdemo.net/files/";
const XHR_ENDPOINT =
  "http://69e5-2402-800-6294-49cf-940c-2a9b-32cf-7ac.ngrok-free.app";

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
  handleVideoData: Dispatch<SetStateAction<object>>;
}

function Uploader(props: UploaderProps) {
  const { handleUpload, handleVideoData } = props;

  uppy.on("file-added", (file) => {
    const Tick = new Date().getTime();
    const newFileName =
      file.name.replace(".mp4", "").replace(/\s/g, "_") + "_" + Tick + ".mp4";

    file.name = newFileName;

    uppy.setFileMeta(file.id, {
      name: newFileName,
    });
  });

  uppy.on("complete", ({ successful, failed }) => {
    console.log("successful\t", successful);
    console.log("failed\t", failed);
  });

  uppy.on("upload-success", function (file, upload) {
    handleUpload(true);
    console.log(file);
    handleVideoData({ fileName: file!.name, fileId: file!.id });
    // console.log("Upload " + file.name + " completed with URL " + upload.url);
    // console.log(
    //   "Developer: Now pass URL " +
    //     upload.url +
    //     " to the backend or dynmically add it to an existing form!"
    // );
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
