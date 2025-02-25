const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: { 
    type: String, 
    default: "" 
  },
  address: { 
    type: String, 
    default: "" 
  },
  profilePicture: { 
    type: String, // Stores the Cloudinary URL
    default: "https://via.placeholder.com/150" // Default profile pic
  },
  role: {
    type: String,
    enum: ["user", "superadmin"],
    default: "user"  
  }
});

// Passport plugin for authentication
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
