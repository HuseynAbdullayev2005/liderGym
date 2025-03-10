import jwt from "jsonwebtoken";
const SECRET_KEY = "your_secret_key"; 
export default function (req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res.status(401).json({ error: "  Token yoxdu" });
  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "yanlis Token" });
  }
}
