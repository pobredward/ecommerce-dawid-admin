import mongoose, { Schema, model, models } from "mongoose";

const PropertySchema = new Schema({
  name: { type: String, required: true },
  values: { type: String, required: true },
});

const CategorySchema = new Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: "Category" },
  properties: [PropertySchema],
});

const Category = models?.Category || model("Category", CategorySchema);

export default Category;
