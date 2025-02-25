const Listing = require("../models/listing");
const { upload } = require("../cloudconfig");
const express = require("express");
const multer = require("multer");
module.exports.index = async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.json(allListings);  // Return the listings as a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to load listings" });
    }
};
module.exports.getListing = async (req, res) => {
  try {
      const listing = await Listing.findById(req.params.id);
      if (!listing) return res.status(404).json({ error: "Listing not found" });
      res.json(listing);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to fetch listing" });
  }
};


exports.createListing = async (req, res) => {
  try {
      console.log("Request Body:", req.body); // Debugging

      const { name, model, type, manufacturer, year, pricePerDay, availability, location, 
          fuelType, transmission, seatingCapacity, doors, mileage, engineCapacity, features, images } = req.body;

      // Ensure `images` is an array before saving
      const imageArray = Array.isArray(images) ? images : images ? [images] : [];

      const newListing = new Listing({
          name,
          model,
          type,
          manufacturer,
          year,
          pricePerDay,
          availability,
          location,
          fuelType,
          transmission,
          seatingCapacity,
          doors,
          mileage,
          engineCapacity,
          features: Array.isArray(features) ? features : features.split(","), 
          images: imageArray, // Store image paths
          reviews: [],
      });

      await newListing.save();
      res.status(201).json(newListing);
  } catch (error) {
      console.error("Error creating listing:", error);
      res.status(500).json({ message: "Error creating listing" });
  }
};


exports.updateListing = async (req, res) => {
  try {
      const { id } = req.params;

      const {
          name, model, type, manufacturer, year, pricePerDay, availability, location, 
          fuelType, transmission, seatingCapacity, doors, mileage, engineCapacity, features, images
      } = req.body;

      // Find existing listing
      const existingListing = await Listing.findById(id);
      if (!existingListing) {
          return res.status(404).json({ message: "Listing not found" });
      }

      // Merge existing images with new ones (if any)
      const updatedImages = images ? images : existingListing.images;

      // Prepare updated listing data
      const updateFields = {
          name,
          model,
          type,
          manufacturer,
          year,
          pricePerDay,
          availability,
          location,
          fuelType,
          transmission,
          seatingCapacity,
          doors,
          mileage,
          engineCapacity,
          features: features ? features.split(",") : existingListing.features, 
          images: updatedImages, // Now storing the correct images
      };

      // Update listing in the database
      const updatedListing = await Listing.findByIdAndUpdate(id, updateFields, { new: true });

      res.status(200).json(updatedListing);
  } catch (error) {
      console.error("Error updating listing:", error);
      res.status(500).json({ message: "Error updating listing" });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find and delete listing
    const deletedListing = await Listing.findByIdAndDelete(id);

    if (!deletedListing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json({ message: "Listing deleted successfully", deletedListing });
  } catch (error) {
    console.error("Error deleting listing:", error);
    res.status(500).json({ message: "Server error while deleting listing" });
  }
};
