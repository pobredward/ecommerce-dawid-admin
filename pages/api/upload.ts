import multiparty from "multiparty";

const handle = async (req, res) => {
  const form = multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) throw err;
    console.log('length:', files.length);
    console.log(fields);
    return res.json("ok");
  });
};

export const config = {
  api: { bodyParser: false },
};

export default handle;
