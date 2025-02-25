import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/payments/my-bookings",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.status === 401) {
          navigate("/login");
          return;
        }

        const data = await response.json();
        setBookings(data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-100 to-purple-200 p-8"
      style={{ paddingTop: "70px" }}
    >
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 animate-fadeIn">
        My Bookings
      </h1>

      {bookings.length > 0 ? (
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="relative bg-white shadow-xl rounded-xl overflow-hidden p-6 border border-gray-300 hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 animate-scaleIn"
            >
              {/* Car Name */}
              <h2 className="text-2xl font-semibold text-gray-900">
                {booking.carId?.name || "Unknown Car"}
              </h2>

              {/* Booking Details */}
              <div className="mt-4 space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold">Booking ID:</span> {booking._id}
                </p>
                <p>
                  <span className="font-semibold">Amount:</span> ₹{booking.amount}
                </p>
                <p>
                  <span className="font-semibold">Days:</span> {booking.days}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(booking.createdAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`ml-2 px-3 py-1 rounded-md text-white text-sm font-semibold ${
                      booking.status.toLowerCase() === "paid"
                        ? "bg-green-500" // ✅ Green for Paid
                        : booking.status.toLowerCase() === "pending"
                        ? "bg-yellow-500" // ✅ Yellow for Pending
                        : "bg-red-500" // ✅ Red for Failed
                    }`}
                  >
                    {booking.status}
                  </span>
                </p>

                {/* Show Razorpay details only if payment is successful */}
                {booking.status.toLowerCase() === "paid" && (
                  <div className="mt-4 border-t border-gray-300 pt-2">
                    <p>
                      <span className="font-semibold">Razorpay Order ID:</span>{" "}
                      {booking.razorpay_order_id}
                    </p>
                    <p>
                      <span className="font-semibold">Razorpay Payment ID:</span>{" "}
                      {booking.razorpay_payment_id}
                    </p>
                    <p>
                      <span className="font-semibold">Razorpay Signature:</span>{" "}
                      <span className="break-words">{booking.razorpay_signature}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Floating Effect */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 opacity-30 rounded-full blur-3xl"></div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-600 mt-6 animate-fadeIn">
          No bookings found.
        </p>
      )}
    </div>
  );
};

export default MyBookings;
