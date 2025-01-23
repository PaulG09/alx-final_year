const express = require("express");
const { signUp } = require("../services/authentication/signup");
const router = express.Router();

router.post("/", async (req, res) => {
  const { fullName, email, username, password } = req.body;

  const result = await signUp(email, password, fullName, username);

  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(400).json({ error: result.error });
  }
});

module.exports = router;
