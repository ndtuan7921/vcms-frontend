import type { NextApiRequest, NextApiResponse } from "next";
// import formidable from "formidable";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //   console.log(req);
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  res.status(200).json({ message: "File uploaded successfully" });
  //   const form = new formidable.IncomingForm();
  //   form.parse(req, (err, fields, files) => {
  //     if (err) {
  //       res.status(500).json({ error: "Error parsing form data" });
  //       return;
  //     }

  //     // Handle the uploaded file
  //     const subtitleFile = files.subtitleFile;
  //     // ... Do something with the subtitle file

  //     // Return a response indicating success
  //     res.status(200).json({ message: "File uploaded successfully" });
  //   });
};

export default handler;
