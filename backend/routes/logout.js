// routes/logoutRoutes.js
const express = require("express");
const router = express.Router();
const { logoutUser } = require("../services/authentication/logout");

router.post("/", logoutUser);

module.exports = router;
