const Review = require("../models/review");  
const Car = require("../models/listing");  

const createReview = async (req, res) => {
  const { carId, comment, rating } = req.body;
  const userId = req.user ? req.user._id : null;  // Extract userId from authenticated request

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: Please log in" });
  }

 
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  
  const car = await Car.findById(carId);
  if (!car) {
    return res.status(404).json({ message: "Car not found" });
  }

  try {
  
    const review = new Review({
      carId,
      userId,   // Save userId in the review
      comment,
      rating,
    });

   
    await review.save();

    
    if (!car.reviews) {
      car.reviews = [];
    }
    car.reviews.push(review._id);
    await car.save();

    res.status(201).json({ message: "Review created successfully", review });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user ? req.user._id.toString() : null; // Get logged-in user ID

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Please log in" });
    }

    
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    
    if (review.userId.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden: You can only delete your own reviews" });
    }

   
    await review.deleteOne();

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { createReview, deleteReview };
