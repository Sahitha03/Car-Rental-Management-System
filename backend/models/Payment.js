const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
  },
  razorpay_payment_id: {
    type: String,
  },
  razorpay_signature: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  days: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    required: true,
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CarListing',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
