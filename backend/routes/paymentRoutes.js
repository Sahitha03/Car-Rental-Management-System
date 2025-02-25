const express = require('express');
const router = express.Router();
const { createPayment, verifyPayment,getPayment, showPayment } = require('../controller/paymentController');
const { isLoggedIn } = require('../middleware.js');
const Payment = require('../models/Payment');
const CarListing = require('../models/listing.js');

// Create a payment order (requires authentication)
router.post('/create-order', isLoggedIn,async (req, res) => {
  console.log('POST /create-order');
  await createPayment(req, res);
});
router.post('/verify-payment', async (req, res) => {
  console.log('POST /verification');
  await verifyPayment(req, res);
});

// Fetch user's bookings
router.get("/my-bookings", isLoggedIn, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }

    const userId = req.user._id;
    const bookings = await Payment.find({ userId})
      .populate({
        path: 'carId',
        select: 'name pricePerDay images location' // Only fetch necessary fields
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
});

// Get all payments
router.get('/all', getPayment);

// Get specific payment by ID
router.get("/:id", showPayment);

module.exports = router;
