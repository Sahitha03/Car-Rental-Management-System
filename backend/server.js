const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/user");
const adminRoutes = require("./routes/adminRoutes");
const listingsRoute = require("./routes/listings");
const reviewRoutes=require("./routes/review");
const uploadRoutes = require("./routes/uploadRoutes");
const session=require("express-session");
const passport=require("passport");
const LocalStrategy= require("passport-local");
const User=require("./models/user");
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
dotenv.config();
const app = express();
const corsOptions = {
  origin: "http://localhost:5173", // Change this to your React app's URL
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
// MongoDB connection

const MONGO_URL = "mongodb+srv://alurisaisahitha:Sahitha@cluster0.ihql5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log("DB Connection Error:", error));

  const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        collectionName: 'sessions'
    }),
    cookie: {
      expires: Date.now() + (1000 * 60 * 60 * 24 * 7), // 7 days
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: false, // Set to true for HTTPS only cookies
      sameSite: 'lax' // Important for cross-origin requests
    }
};
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// app.use("/api/admin", adminRoutes);
app.use((req, res, next) => {
  console.log("Request URL:", req.url);
  console.log("Session:", req.session);
  console.log("User:", req.user);
  next();
});
app.use('/uploads', express.static('uploads'));
// app.use("api/upload",uploadRoutes);
app.use("/api/listings", require("./routes/listings"));
// app.use("/api/auth", authRoutes);
app.use("/api", authRoutes);
app.use("/admin", adminRoutes);
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use('/api/reviews', reviewRoutes);

app.get('/test-session', (req, res) => {
  res.json({
    session: req.session,
    passport: req.session.passport,
    user: req.user
  });
});
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});

