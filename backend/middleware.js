const Listing = require('./models/listing');
const Review = require('./models/review');
const { listingSchema} = require('./models/listing');
const {reviewSchema} = require('./models/review');

// Middleware to set current user from session or token
module.exports.setCurrentUser = (req, res, next) => {
  const user = req.user; // Assuming req.user is set by authentication middleware
  if (user) {
    res.locals.currUser = user;
  } else {
    res.locals.currUser = null;
  }
  next();
};

// Check if user is logged in
module.exports.isLoggedIn = (req, res, next) => {
  console.log('User:', req.user);  // Moved inside the middleware function
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: 'You must be logged in to perform this action.' 
    });
  }
  next();
};


// Save Redirect URL
// module.exports.saveRedirectUrl = (req, res, next) => {
//   if (req.session.redirectUrl) {
//     res.locals.redirectUrl = req.session.redirectUrl;
//   }
//   next();
// };

// // Check if the user is the owner of the listing
// module.exports.isOwner = async (req, res, next) => {
//   const { id } = req.params;
//   const listing = await Listing.findById(id);

//   if (!listing) {
//     return res.status(404).json({ message: 'Listing not found.' });
//   }

//   if (!listing.owner.equals(res.locals.currUser._id)) {
//     return res.status(403).json({ message: 'You are not authorized to perform this action.' });
//   }

//   next();
// };

// // Validate Listing Schema
// module.exports.validateListing = (req, res, next) => {
//   const { error } = listingSchema.validate(req.body);

//   if (error) {
//     const msg = error.details.map(el => el.message).join(', ');
//     throw new ExpressError(400, msg); // Ensure numeric status code is used
//   }

//   next();
// };

// // Validate Review Schema
// module.exports.validateReview = (req, res, next) => {
//   const { error } = reviewSchema.validate(req.body);

//   if (error) {
//     const errMsg = error.details.map(el => el.message).join(', ');
//     throw new ExpressError(400, errMsg);
//   }

//   next();
// };

// Check if the user is the author of the review
// module.exports.isAuthor = async (req, res, next) => {
//   const { reviewId, id } = req.params;
//   const review = await Review.findById(reviewId);

//   if (!review) {
//     return res.status(404).json({ message: 'Review not found.' });
//   }

//   if (!review.author.equals(res.locals.currUser._id)) {
//     return res.status(403).json({ message: 'You are not authorized to perform this action.' });
//   }

//   next();
// };
