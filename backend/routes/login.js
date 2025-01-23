const express = require("express");
const router = express.Router();
const { login } = require("../services/authentication/login");

// routes/loginRoutes.js
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res
      .status(400)
      .json({ error: "Please provide a valid email address." });
  }

  try {
    const result = await login(email, password);

    if (result.success) {
      // Create a session
      req.session.user = {
        id: result.user.id, // User's Firebase UID
        email: result.user.email,
        displayName: result.user.displayName, // Optional
      };

      return res.status(200).json({
        message: "Login successful!",
        user: result.user,
      });
    } else {
      return res.status(400).json({ error: result.error });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
});

module.exports = router;
