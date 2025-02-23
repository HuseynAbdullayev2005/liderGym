// models/Product.js
import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  header: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  content: { type: String, required: true },
});

export default model("Product", ProductSchema);
