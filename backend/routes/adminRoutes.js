const express = require("express");
const router = express.Router();
const admin = { username: "admin", password: "password" };
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === admin.username && password === admin.password) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});
module.exports = router;