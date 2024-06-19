import mongooseConnect from "../../lib/mongoose";
import Category from "../../models/Category";

const handle = async (req, res) => {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    res.json(await Category.find().populate("parent"));
  }

  if (method === "POST") {
    const { name, parent } = req.body;
    const categoryDoc = await Category.create({
      name,
      parent: parent || null,
    });
    res.json(categoryDoc);
  }

  if (method === "PUT") {
    const { _id, name, parent } = req.body;
    const categoryDoc = await Category.updateOne(
      { _id },
      {
        name,
        parent: parent || null,
      },
    );
    res.json(categoryDoc);
  }

  if (method === "DELETE") {
    if (req.query?._id) {
      await Category.deleteOne({ _id: req.query?._id });
      res.json(true);
    }
  }
};

export default handle;
