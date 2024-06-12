import { NextApiRequest, NextApiResponse } from "next";
import multiparty from "multiparty";

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

    if (files && files.file) {
      console.log("length:", Array.isArray(files.file) ? files.file.length : 1);
    } else {
      console.log("No files uploaded");
    }

    res.status(200).json({ fields, files });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const config = {
  api: { bodyParser: false },
};

export default handle;
