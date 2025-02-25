const mongoose = require('mongoose');

const carListingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['Sedan', 'SUV', 'Hatchback', 'Luxury', 'Convertible', 'Truck', 'Van'],
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  pricePerDay: {
    type: Number,
    required: true
  },
  availability: {
    type: Boolean,
    default: true
  },
  location: {
    type: String,
    required: true
  },
  fuelType: {
    type: String,
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
    required: true
  },
  transmission: {
    type: String,
    enum: ['Automatic', 'Manual'],
    required: true
  },
  seatingCapacity: {
    type: Number,
    required: true
  },
  doors: {
    type: Number,
    required: true
  },
  mileage: {
    type: String
  },
  engineCapacity: {
    type: Number
  },
  features: [{
    type: String
  }],
  images: [{
    type: String, // Store Cloudinary URLs
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  reviews:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

const CarListing = mongoose.model("CarListing", carListingSchema);
module.exports = CarListing;
