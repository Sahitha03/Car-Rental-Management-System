const User = require("../models/user");
const passport = require("passport");
const { isLoggedIn } = require('../middleware.js');
const { CloudinaryStorage } = require("multer-storage-cloudinary"); // Import this
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile_pictures", // Folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage: storage });
// Signup new user
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    res.status(201).json({ message: "User registered successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      req.session.passport.userId = user._id;
      req.session.passport.username = user.username;
      res.status(200).json({ success: true, message: "User logged in successfully", user });
    });
  })(req, res, next);
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password"); // Exclude password
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
}; // ✅ Fixed: Added closing bracket

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { phone, address } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { phone, address },
      { new: true }
    ).select("-password");
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

// Upload profile picture
const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      console.error("Error uploading image: No file uploaded");
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("Uploading file to Cloudinary:", req.file.path);
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile_pictures",
    });

    console.log("Cloudinary Upload Success:", result.secure_url);

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profilePicture: result.secure_url },
      { new: true }
    ).select("-password");

    console.log("User profile updated with new picture:", user);
    res.json(user);
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Error uploading profile picture", error: error.message });
  }
};


// Logout user
const logout = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    res.status(200).json({ message: "User logged out successfully" });
  });
};

// Get all users
const index = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to load users" });
  }
};

// Export all functions
module.exports = { signup, login, getProfile, updateProfile, uploadProfilePicture, logout, index };
