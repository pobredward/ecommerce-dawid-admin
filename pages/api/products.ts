import mongoose from "mongoose";
import Product from "../../models/Product";

const handle = async (req, res) => {
  const { method } = req;
  mongoose.connect(process.env.MONGODB_URI);
  if (method === "POST") {
    const { title, description, price } = req.body;
    const productDoc = await Product.create({
      title,
      description,
      price,
    });
    res.json(productDoc);
  }
};

export default handle;
