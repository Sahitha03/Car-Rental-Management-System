const express = require('express');
const {checkAuth} = require('../middleware/authMiddleware');  
const Review = require('../models/review');  
const Listing = require('../models/listing');  
const { createReview, deleteReview } = require('../controller/review');  // FIXED PATH

const router = express.Router();

router.post('/', checkAuth, createReview);  // Now protected with authentication


router.get("/all", async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("userId", "username")  
      .populate("carId", "name");  

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/:carId', async (req, res) => {
  try {
    const reviews = await Review.find({ carId: req.params.carId });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error while fetching reviews' });
  }
});



router.delete('/:id', deleteReview);

module.exports = router;
