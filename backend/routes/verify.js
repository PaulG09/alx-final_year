const express = require("express");
const { verifyAccount } = require("../services/authentication/verifyAccount");
const router = express.Router();

router.get("/:token", async (req, res) => {
  const { token } = req.params;

  try {
    // Verify the account and get the user data
    const userData = await verifyAccount(token);

    // Create a session for the user
    req.session.user = {
      id: userData.id,
      email: userData.email,
      username: userData.username,
      fullName: userData.fullName,
    };

    // Redirect to the dashboard route
    res.redirect("/dashboard"); // Redirect to dashboard after successful verification
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
