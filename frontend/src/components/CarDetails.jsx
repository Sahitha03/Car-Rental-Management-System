import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main styles
import "react-date-range/dist/theme/default.css"; // Theme styles
import TimePicker from "react-time-picker";
import { Users, Clock } from "lucide-react";
import "react-time-picker/dist/TimePicker.css";
import { differenceInDays, addDays } from "date-fns";
import "react-clock/dist/Clock.css"; 
import axios from "axios";

const CarDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [days, setDays] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [reviews, setReviews] = useState([]); // Store reviews separately
  const [review, setReview] = useState({ comment: "", rating: 1 }); // Store new review input
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    key: "selection"
  });
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("17:00");
  const navigate = useNavigate();

  // Load Razorpay SDK dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => console.log("Razorpay SDK Loaded");
    document.body.appendChild(script);
  }, []);

    // Fetch car details and reviews
    useEffect(() => {
      const fetchData = async () => {
        try {
          const carRes = await axios.get(`http://localhost:8080/api/listings/${id}`);
          setListing(carRes.data);
          setTotalPrice(carRes.data.pricePerDay);
          setLoading(false);
  
          // Fetch reviews separately
          const reviewRes = await axios.get(`http://localhost:8080/api/reviews/${id}`);
          setReviews(reviewRes.data);
        } catch (err) {
          console.error("Error fetching data:", err);
          setError("Listing not found");
          setLoading(false);
        }
      };
  
      fetchData();
    }, [id]);

  const numberOfDays = differenceInDays(dateRange.endDate, dateRange.startDate) + 1 || 1;
  const subtotal = listing?.pricePerDay ? listing.pricePerDay * numberOfDays : 0;
  const serviceFee = subtotal * 0.1; // Example: 10% service fee
  const total = subtotal + serviceFee;

  useEffect(() => {
    if (listing) {
      setTotalPrice((listing.pricePerDay * numberOfDays) + serviceFee);
    }
  }, [numberOfDays, listing]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (review.comment.trim() === "") {
      alert("Please enter a comment.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/reviews`,
        {
          carId: id,
          comment: review.comment,
          rating: review.rating,
        },
        { withCredentials: true }
      );

      alert("Review submitted successfully!");
      setReviews((prev) => [...prev, response.data]); // Update reviews list
      setReview({ comment: "", rating: 1 }); // Reset input
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:8080/api/reviews/${reviewId}`, { withCredentials: true });
      alert("Review deleted successfully!");
      setReviews((prev) => prev.filter((review) => review._id !== reviewId)); // Remove from UI
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review.");
    }
  };
  // Handle Payment
  const handlePayment = async () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please check your internet connection.");
      return;
    }

    try {
      const orderResponse = await axios.post("http://localhost:8080/api/payments/create-order", {
        amount: totalPrice * 100, // Convert to paise
        days: days, 
        carId: id
      }, {
        withCredentials: true,
      });

      const options = {
        key: "rzp_test_AXaPRSYNayO64N", // Replace with Razorpay Key
        amount: orderResponse.data.amount,
        name: "Car Rental",
        description: `${listing.make} ${listing.model} - ${days} days rental`,
        order_id: orderResponse.data.orderId,
        handler: async (response) => {
          await axios.post("http://localhost:8080/api/payments/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          alert("Payment successful!");
          navigate("/");
        },
        prefill: {
          name: "Your Name",
          email: "your.email@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#3399cc"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  if (loading) return <p>Loading details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <button onClick={() => navigate(-1)} className="text-blue-600 font-semibold mb-6">
        &larr; Back to Listings
      </button>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">{listing.name}</h1>

        {/* Car Images */}
        <div className="flex gap-6 mt-4">
          <div className="w-2/3">
            <img
              src={listing.images[0]}
              alt={`${listing.name} - Main View`}
              className="w-full h-[400px] object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
            />
          </div>
          <div className="w-2/3 grid grid-cols-2 gap-3">
            {listing.images.slice(1, 5).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${listing.name} - ${index + 1}`}
                className="w-full h-[190px] object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Car Details */}
        <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700">{listing.make} {listing.model}</h2>
          <p className="text-gray-600"><strong>Year:</strong> {listing.year}</p>
          <p className="text-gray-600"><strong>Price per day:</strong> ₹{listing.pricePerDay}</p>
          <p className="text-gray-600"><strong>Mileage:</strong> {listing.mileage} miles</p>
          <p className="text-gray-600"><strong>Fuel Type:</strong> {listing.fuelType}</p>
          <p className="text-gray-600"><strong>Transmission:</strong> {listing.transmission}</p>
          <p className="text-gray-600"><strong>Location:</strong> {listing.location}</p>
        </div>

        <div className="mt-6 p-6 border-t">
          <h2 className="text-2xl font-semibold">Reviews</h2>
          <form onSubmit={handleReviewSubmit} className="mt-4 space-y-4">
            <textarea
              value={review.comment}
              onChange={(e) => setReview({ ...review, comment: e.target.value })}
              placeholder="Write your review..."
              className="w-full border rounded-md p-3"
              required
            ></textarea>
            <select
              value={review.rating}
              onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}
              className="border rounded-md p-2 w-full"
              required
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}{num > 1}
                </option>
              ))}
            </select>
            <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition">
              Submit Review
            </button>
          </form>

          {/* Display Reviews */}
          {reviews.length > 0 ? (
            <ul className="mt-6 space-y-4">
              {reviews.map((rev) => (
                <li key={rev._id} className="border p-4 rounded-md">
                  <p className="text-gray-800">{rev.comment}</p>
                  <p className="text-sm text-gray-500">Rating: {rev.rating} ⭐️</p>
                  <button onClick={() => handleDeleteReview(rev._id)} className="text-red-600 mt-2">
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 mt-4">No reviews yet. Be the first to review!</p>
          )}
        </div>

        {/* Calendar and Booking Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Calendar Section */}
          <div className="lg:col-span-8">
            <h2 className="text-lg font-semibold mb-4">Select Dates</h2>
            <div className="bg-white rounded-lg">
              <DateRange
                ranges={[dateRange]}
                onChange={item => setDateRange(item.selection)}
                months={2}
                direction="horizontal"
                minDate={new Date()}
                rangeColors={['#3b82f6']}
                className="border border-gray-200 rounded-lg"
              />
            </div>
          </div>

          {/* Booking Panel */}
          <div className="lg:col-span-4">
            <div className="border rounded-xl shadow-lg p-6 space-y-6">
              {/* Price Header */}
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold">₹{listing.pricePerDay * numberOfDays}</span>
                <span className="text-gray-500">Price</span>
              </div>

              {/* Booking Form */}
              <div className="border rounded-lg divide-y">
                {/* Dates */}
                <div className="grid grid-cols-2 divide-x">
                  <div className="p-3">
                    <div className="text-xs font-bold uppercase">Pickup Date</div>
                    <div>{dateRange.startDate.toLocaleDateString()}</div>
                  </div>
                  <div className="p-3">
                    <div className="text-xs font-bold uppercase">Return Date</div>
                    <div>{dateRange.endDate.toLocaleDateString()}</div>
                  </div>
                </div>

                {/* Times */}
                <div className="p-3 space-y-3">
                  <div>
                    <label className="text-xs font-bold uppercase">Pickup Time</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <TimePicker value={startTime} onChange={setStartTime} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase">Return Time</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <TimePicker value={endTime} onChange={setEndTime} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="underline">₹{listing.pricePerDay} × {numberOfDays} Days</div>
                  <div>₹{subtotal}</div>
                </div>
                <div className="flex justify-between">
                  <div className="underline">Service fee</div>
                  <div>₹{serviceFee}</div>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold">
                  <div>Total before taxes</div>
                  <div>₹{total}</div>
                </div>
              </div>

              <button onClick={handlePayment} className="w-full bg-blue-400 text-white py-3 px-6 rounded-lg hover:bg-blue-400/90 transition-colors">
                Reserve
              </button>

              <p className="text-center text-gray-500 text-sm">
                You won't be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;