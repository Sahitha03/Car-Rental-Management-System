import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentsList = () => {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/payments/all")
      .then((res) => res.json())
      .then((data) => setPayments(data))
      .catch((err) => console.error("Error fetching payments:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Payments</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Car</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id} className="border-b hover:bg-gray-100">
                <td className="p-4">{payment.userId?.username || "Unknown User"}</td>
                <td className="p-4">{payment.carId?.name || "Unknown Car"}</td>
                <td className="p-4">₹{payment.amount}</td>
                <td className="p-4">
                <span className="font-semibold">Status:</span> 
                <span className={`ml-2 px-3 py-1 rounded-md text-white ${ payment.status.toLowerCase() === "paid" ? "bg-green-500" : "bg-red-500"}`}>
                {payment.status}
                </span>
                </td>
                <td className="p-4">{new Date(payment.createdAt).toLocaleString()}</td>
                <td className="p-4">
                  <button
                    onClick={() => navigate(`/admin/payments/${payment._id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsList;
