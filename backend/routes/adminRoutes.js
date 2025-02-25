const express = require("express");
const { loginAdmin, getDashboard, logoutAdmin } = require("../controller/adminController");
const { requireAdminAuth } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin authentication routes
router.post("/login", loginAdmin);
router.get("/dashboard", requireAdminAuth, getDashboard);
router.post("/logout", logoutAdmin);

module.exports = router;
