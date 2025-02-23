import { Schema, model } from "mongoose";
const WishlistSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});
export default model("Wishlist", WishlistSchema);
