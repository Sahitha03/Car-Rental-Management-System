require("dotenv").config();
const Listing = require("../models/listing");
const Review = require("../models/review");
const Payment = require("../models/Payment");
const User = require("../models/user");

const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD,
};

// Login Route
exports.loginAdmin = (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    req.session.admin = true; // Set admin session
    res.json({ success: true, message: "Admin logged in" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
};

// Middleware to Protect Admin Routes
exports.isAdminAuthenticated = (req, res, next) => {
  if (req.session.admin) {
    next(); // Proceed if authenticated
  } else {
    res.status(403).json({ success: false, message: "Access denied. Admin only." });
  }
};

// Dashboard Route (Protected)
exports.getDashboard = async (req, res) => {
  try {
    if (!req.session.admin) {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    // Count total listings, reviews, payments, and users
    const totalListings = await Listing.countDocuments();
    const totalReviews = await Review.countDocuments();
    const totalPayments = await Payment.countDocuments();
    const totalUsers = await User.countDocuments();

    // Aggregate user booking counts from Payments
    const userBookings = await Payment.aggregate([
      {
        $group: {
          _id: "$userId",
          bookings: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          username: "$user.username",
          bookings: 1,
        },
      },
    ]);

    res.json({
      totalListings,
      totalReviews,
      totalPayments,
      totalUsers,
      userBookings,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Logout Route
exports.logoutAdmin = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error logging out:", err);
      return res.status(500).json({ success: false, message: "Logout failed" });
    }
    res.json({ success: true, message: "Logged out successfully" });
  });
};
