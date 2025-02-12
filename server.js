const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const { body, validationResult } = require("express-validator");
const helmet = require("helmet");
const cors = require("cors")
require("dotenv").config();
const  generateToken  = require("./utils")
const app = express();
app.use(cors())
// Middleware
app.use(express.json());
app.use(express.static("uploads"));
app.use(helmet()); // Adds security headers

// Environment Variables
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET || !MONGODB_URI) {
  console.error("Critical environment variables are missing in .env");
  process.exit(1); // Exit if critical env variables are not set
}

// MongoDB Connection
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  images: [
    {
      filename: String,
      uploadedAt: { type: Date, default: Date.now },
    },
  ],
});
const User = mongoose.model("User", userSchema);

// Register Route
app.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required."),
    body("email").isEmail().withMessage("Valid email is required."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ message: "Email already registered." });
      } else {
        res.status(500).json({ message: "Error registering user.", error: error.message });
      }
    }
  }
);

// Login Route

app.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required."),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials." });
      }

      // Generate token and set it in the cookie
      generateToken(user._id, res);

      res.status(200).json({ message: "Login successful!" });
    } catch (error) {
      res.status(500).json({ message: "Error logging in.", error: error.message });
    }
  }
);


// Upload Middleware with Validation
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only images (jpeg, jpg, png) are allowed."));
    }
  },
});

// Save Captured Image
app.post("/upload", upload.single("image"), async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found." });

    user.images.push({ filename: req.file.filename });
    await user.save();

    res.status(200).json({ message: "Image uploaded successfully!", filename: req.file.filename });
  } catch (error) {
    res.status(500).json({ message: "Error uploading image.", error: error.message });
  }
});

// Fetch User Images
app.get("/images", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json({ images: user.images });
  } catch (error) {
    res.status(500).json({ message: "Error fetching images.", error: error.message });
  }
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Something went wrong!" });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
