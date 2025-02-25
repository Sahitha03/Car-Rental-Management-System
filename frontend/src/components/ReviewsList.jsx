import React, { useEffect, useState } from "react";

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/reviews/all")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Reviews</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Car</th>
              <th className="p-4 text-left">Rating</th>
              <th className="p-4 text-left">Review</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} className="border-b hover:bg-gray-100">
                <td className="p-4">{review.userId?.username || "Anonymous"}</td>
                <td className="p-4">{review.carId?.name || "Unknown Car"}</td>
                <td className="p-4">{review.rating} ⭐</td>
                <td className="p-4">{review.comment}</td>
                <td className="p-4">{new Date(review.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewsList;
