import { NextApiRequest, NextApiResponse } from "next";
import multiparty from "multiparty";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import mime from "mime-types";

const bucketName = "military-protein-test";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const form = new multiparty.Form();
    const { fields, files } = await new Promise<{ fields: any; files: any }>(
      (resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          resolve({ fields, files });
        });
      },
    );

    if (files && files.files) {
      console.log("length:", Array.isArray(files.file) ? files.file.length : 1);
    } else {
      console.log("No files uploaded");
      res.status(400).json({ error: "No files uploaded" });
    }

    const client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });

    const links = [];
    for (let i = 0; i < files.files.length; i++) {
      const file = files.files[i];
      const ext = file.originalFilename.split("").pop();
      const newFilename = Date.now() + "." + ext;
      await client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: newFilename,
          Body: fs.readFileSync(file.path),
          ACL: "public-read",
          ContentType: mime.lookup(file.path),
        }),
      );
      const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
      links.push(link);
    }

    res.status(200).json({ links });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const config = {
  api: { bodyParser: false },
};

export default handle;
