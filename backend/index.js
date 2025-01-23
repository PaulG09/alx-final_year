const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60, secure: false, httpOnly: true },
  })
);

// Cache-Control Headers Middleware
app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

// Public Routes (Unprotected)
app.get("/", (req, res) => {
  if (req.session.user) {
    // If the user is logged in, redirect to the dashboard
    return res.redirect("/dashboard");
  }
  // Otherwise, serve the index.html page
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Login and Signup HTML Pages
app.get("/signup/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/signup/index.html"));
});

app.get("/login/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login/index.html"));
});

// Login and Signup CSS and JS Files
app.get("/signup/styles.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/signup/styles.css"));
});

app.get("/signup/scripts.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/signup/scripts.js"));
});

app.get("/login/styles.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login/styles.css"));
});

app.get("/login/scripts.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login/scripts.js"));
});

// Authentication middleware to protect routes
const checkAuth = (req, res, next) => {
  const allowedPaths = [
    "/",
    "/login/",
    "/signup/",
    "/styles.css",
    "/api/auth/",
  ];

  // If the requested path is in the allowed paths, proceed
  if (allowedPaths.includes(req.path) || req.path.startsWith("/api/auth/")) {
    return next(); // Allow access to public routes or auth-related routes
  }

  // If not logged in and trying to access a protected route, redirect to root
  if (!req.session.user) {
    return res.redirect("/"); // Redirect to the root page if not logged in
  }

  next(); // Proceed if authenticated
};

// Apply authentication middleware to all routes except allowed ones
app.use(checkAuth);

// Serve static files for other routes (after authentication check)
app.use(express.static(path.join(__dirname, "../frontend")));

// Protected API routes
app.use("/api/auth/signup", require("./routes/signup"));
app.use("/api/auth/login", require("./routes/login"));
app.use("/api/auth/verify", require("./routes/verify"));
app.use("/api/auth/logout", require("./routes/logout"));
app.use("/api", require("./routes/plots"));

// Catch-all route for undefined frontend paths
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html")); // Serve the main frontend file
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
