const Payment = require('../models/Payment');
//const sendEmail = require("./emailService");
const sendEmail = require("../services/emailService");
const crypto = require("crypto");
const axios=require("axios");
const Razorpay = require("razorpay");
const User = require("../models/user"); // ✅ Import the User model

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const createPayment = async (req, res) => {
  try {
    console.log("Received payment request:", req.body);
    console.log("Session Data:", req.session); // ✅ This should be inside the function

    // Get user from session
    const username = req.session.passport?.user;
    if (!username) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //const userId = req.session.userId;  // ✅ Get userId from session safely
    const { amount, days, carId } = req.body;
    if (!amount || !days || !carId) {
      console.error("❌ Missing required fields:", { amount, days, carId });
      return res.status(400).json({ message: "Missing required fields" });
    }

    const options = {
      amount: amount, 
      currency: "INR",
      receipt: `order_rcptid_${Math.floor(Math.random() * 1000000)}`,
    };

    console.log("📦 Creating Razorpay order with options:", options);

    const order = await razorpay.orders.create(options);
    console.log("✅ Order created successfully:", order);
   
    const payment = new Payment({
      razorpay_order_id: order.id,
      amount: amount / 100,
      days,
      carId,
      userId: user._id,
      status: "pending",
    });

    await payment.save();
    console.log("💾 Payment saved to database:", payment);

    res.json({ orderId: order.id, key: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    console.error("🚨 Error creating order:", error);
    res.status(500).json({ message: "Order creation failed", error: error.message });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // ✅ Generate expected signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    // ✅ Check if payment is authentic
    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // ✅ Update payment status to "Paid"
      const payment = await Payment.findOneAndUpdate(
        { razorpay_order_id },
        { razorpay_payment_id, razorpay_signature, status: "Paid" },
        { new: true }
      ).populate("userId").populate("carId");

      if (!payment) {
        return res.status(404).json({ message: "Payment record not found" });
      }

      // ✅ Get user email from the database
      const user = await User.findById(payment.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // ✅ Send email to user
      await sendEmail(
        user.email,
        "Booking Confirmation",
        `<h2>Your booking is confirmed! 🎉</h2>
         <p>Dear ${user.username},</p>
         <p>Your payment of <b>₹${payment.amount / 100}</b> for <b>${payment.carId.name}</b> has been successfully processed.</p>
         <p><b>Booking Details:</b></p>
         <ul>
           <li><b>Car:</b> ${payment.carId.name}</li>
           <li><b>Booking ID:</b> ${payment._id}</li>
           <li><b>Order ID:</b> ${payment.razorpay_order_id}</li>
           <li><b>Payment ID:</b> ${payment.razorpay_payment_id}</li>
           <li><b>Days:</b> ${payment.days}</li>
           <li><b>Status:</b> Paid ✅</li>
         </ul>
         <p>Enjoy your ride! 🚗💨</p>
         <p>Best Regards,<br>Your Car Rental Team</p>`
      );

      return res.json({ message: "Payment verified, email sent to user." });
    } else {
      return res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("🚨 Error verifying payment:", error);
    return res.status(500).json({ message: "Payment verification failed", error: error.message });
  }
};

  const getPayment=async (req, res) => {
    try {
      const payments = await Payment.find().populate('userId').populate('carId');
      res.json(payments);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching payments' });
    }
};
const showPayment=async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("userId")
      .populate("carId");
      
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payment details" });
  }
}
module.exports = {
  createPayment,verifyPayment,getPayment,showPayment
};
