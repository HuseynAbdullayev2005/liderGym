import { Schema, model } from "mongoose";
const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  stripePaymentId: { type: String },
  createdAt: { type: Date, default: Date.now },
});
export default model("Order", OrderSchema);
