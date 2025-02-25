import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("http://localhost:8080/admin/dashboard", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return <div className="text-center mt-10 text-lg">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6" style={{ paddingTop: "100px" }}>
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Dashboard</h1>

        {/* Grid Layout for Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Listings Card */}
          <div
            className="bg-blue-500 text-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition"
            onClick={() => navigate("/admin/listings")}
          >
            <h2 className="text-lg font-semibold">Total Listings</h2>
            <p className="text-2xl font-bold">{dashboardData.totalListings}</p>
          </div>

          {/* Users Card */}
          <div
            className="bg-green-500 text-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-green-600 transition"
            onClick={() => navigate("/admin/users")}
          >
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-2xl font-bold">{dashboardData.totalUsers}</p>
          </div>

          {/* Payments Card */}
          <div
            className="bg-purple-500 text-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-purple-600 transition"
            onClick={() => navigate("/admin/payments")}
          >
            <h2 className="text-lg font-semibold">Total Payments</h2>
            <p className="text-2xl font-bold">{dashboardData.totalPayments}</p>
          </div>

          {/* Reviews Card */}
          <div
            className="bg-yellow-500 text-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-yellow-600 transition"
            onClick={() => navigate("/admin/reviews")}
          >
            <h2 className="text-lg font-semibold">Total Reviews</h2>
            <p className="text-2xl font-bold">{dashboardData.totalReviews}</p>
          </div>
        </div>

        {/* User Bookings Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">User Bookings</h2>
          <ul className="space-y-2">
            {dashboardData.userBookings.map((user, index) => (
              <li key={index} className="border p-3 rounded-md shadow-sm flex justify-between bg-gray-50">
                <span className="font-medium">{user.username}</span>
                <span className="text-blue-600 font-semibold">{user.bookings} Bookings</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
