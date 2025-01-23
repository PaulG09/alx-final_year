function logoutUser(req, res) {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err.message);
        return res.status(500).send("Failed to log out.");
      }

      // Clear the session cookie
      res.clearCookie("connect.sid");

      // Optionally, send a response to indicate that the user has logged out successfully
      res.status(200).send({ message: "Logged out successfully" });

      // Redirect to the root route (or any other public page)
      // res.redirect("/"); // You can also return this as a JSON response to handle it client-side
    });
  } catch (error) {
    console.error("Error during logout:", error.message);
    res.status(500).send("Failed to log out.");
  }
}

module.exports = { logoutUser };
