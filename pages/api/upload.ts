import multiparty, { Fields, File } from "multiparty";

interface FormResult {
  fields: Fields;
  files: File[];
}

const handle = async (req, res) => {
  const form = new multiparty.Form();
  const { fields, files } = await new Promise<FormResult>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
  console.log(files);
  console.log(fields);
  return res.json("ok");
};

export const config = {
  api: { bodyParser: false },
};

export default handle;
