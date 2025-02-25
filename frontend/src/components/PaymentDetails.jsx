import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PaymentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/payments/${id}`)
      .then((res) => res.json())
      .then((data) => setPayment(data))
      .catch((err) => console.error("Error fetching payment details:", err));
  }, [id]);

  if (!payment) {
    return <div className="text-center p-6">Loading payment details...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment Details</h1>
      <div className="max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <p><strong>Payment ID:</strong> {payment._id}</p>
        <p><strong>User:</strong> {payment.userId?.username || "Unknown"}</p>
        <p><strong>Car:</strong> {payment.carId?.name || "Unknown"}</p>
        <p><strong>Amount:</strong> ₹{payment.amount}</p>
        <p><strong>Status:</strong> {payment.status}</p>
        <p><strong>Days:</strong> {payment.days}</p>
        <p><strong>Date:</strong> {new Date(payment.createdAt).toLocaleString()}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default PaymentDetails;
