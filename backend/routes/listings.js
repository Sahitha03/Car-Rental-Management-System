const express = require("express");
const listingController = require("../controller/listing");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "car_rental", // Folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage: storage });

// Route to create a listing
router.post("/", upload.array("images", 5), listingController.createListing);

// Route to get all listings
router.get("/",listingController.index);
router.get("/:id", listingController.getListing);
router.put("/:id", upload.array("images", 5), listingController.updateListing);
// DELETE a listing by ID
router.delete("/:id", listingController.deleteListing);
module.exports = router;
