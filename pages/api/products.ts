import mongoose from "mongoose";
import clientPromise from "../../lib/mongodb";
import Product from "../../models/Product";

const handle = async (req, res) => {
  const { method } = req;
  // mongoose.connect(process.env.MONGODB_URI);
  mongoose.Promise = clientPromise;
  if (method === "POST") {
    Product.create({
      
    })
    res.json("post");
  }
};

export default handle;
