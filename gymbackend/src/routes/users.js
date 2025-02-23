import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const router = Router();
const SECRET_KEY = "your_secret_key";

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/register/admin", auth, async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const adminUser = new User({
      username,
      email,
      password: hashedPassword,
      role: "admin",
    });
    await adminUser.save();
    res.status(201).json({ message: "Admin registered " });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "yanlis email veya password" });

    const token = jwt.sign(
      { id: user._id, role: user.role, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ token, username: user.username });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/basket", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("basket.product");
    res.json(user.basket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/basket/add", auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = await User.findById(req.user.id);
    const existingItemIndex = user.basket.findIndex(
      (item) => item.product.toString() === productId
    );
    if (existingItemIndex !== -1) {
      user.basket[existingItemIndex].quantity += quantity;
    } else {
      user.basket.push({ product: productId, quantity });
    }
    await user.save();
    const updatedUser = await User.findById(req.user.id).populate(
      "basket.product"
    );
    res.json(updatedUser.basket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/basket/remove", auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user.id);
    user.basket = user.basket.filter(
      (item) => item.product.toString() !== productId
    );
    await user.save();
    const updatedUser = await User.findById(req.user.id).populate(
      "basket.product"
    );
    res.json(updatedUser.basket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/basket/increase", auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user.id);
    const item = user.basket.find(
      (item) => item.product.toString() === productId
    );
    if (item) {
      item.quantity++;
      await user.save();
    }
    const updatedUser = await User.findById(req.user.id).populate(
      "basket.product"
    );
    res.json(updatedUser.basket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/basket/decrease", auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user.id);
    const item = user.basket.find(
      (item) => item.product.toString() === productId
    );
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) {
        user.basket = user.basket.filter(
          (item) => item.product.toString() !== productId
        );
      }
      await user.save();
    }
    const updatedUser = await User.findById(req.user.id).populate(
      "basket.product"
    );
    res.json(updatedUser.basket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/admin/users", auth, adminAuth, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/:id", auth, adminAuth, async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.body.password) {
      updateData.password = await bcrypt.hash(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-password");
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
