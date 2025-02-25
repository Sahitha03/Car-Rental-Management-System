const express = require("express");
const { signup, login,logout,index,getProfile, updateProfile, uploadProfilePicture} = require("../controller/User");
const userController=require("../controller/User");
const {isLoggedIn}=require("../middleware");
const { CloudinaryStorage } = require("multer-storage-cloudinary"); // Import this
const User = require("../models/user");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const router = express.Router();
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });

// Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile_pictures", // Folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage: storage });
// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);
router.get("/profile", isLoggedIn, getProfile);

// Update user profile
router.put("/profile", isLoggedIn, updateProfile);

// Upload profile picture
router.post("/upload-profile-pic", isLoggedIn, upload.single("profilePicture"),uploadProfilePicture);
router.get("/logout",logout);
router.get("/users",index);

module.exports = router;

