
import { Router } from "express";
import Wishlist from "../models/Wishlist.js";
import auth from "../middleware/auth.js";

const router = Router();


router.post("/add", auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: req.user.id },
      { $addToSet: { products: req.body.productId } },
      { upsert: true, new: true }
    ).populate("products");
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/remove", auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { products: req.body.productId } },
      { new: true }
    ).populate("products");
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/", auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate("products");
    res.json(wishlist || { products: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
