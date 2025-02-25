const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    req.userId = decoded.id; // Store user ID in request object
    next();
  });
};
const checkAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {  // Passport.js method to check if user is logged in
    return res.status(401).json({ message: "Unauthorized: Please log in" });
  }
  next();
};

const requireAdminAuth = (req, res, next) => {
  if (!req.session?.admin) {
    return res.status(403).json({ success: false, message: "Access denied" });
  }
  next();
};

module.exports = { verifyToken, requireAdminAuth,checkAuth };
