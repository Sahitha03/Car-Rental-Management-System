const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'CarListing',  
    required: true  
  },
  userId: {  // ADD THIS
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true  
  },
  comment: {
    type: String,
    required: true  
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true  
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
