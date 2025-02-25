import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminListings = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/listings", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6" style={{ paddingTop: "80px" }}>
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">All Listings</h1>

        <button
          className="mb-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          onClick={() => navigate("/newlisting")}
        >
          + Create New Listing
        </button>

        {listings.length === 0 ? (
          <p className="text-center text-gray-500">No listings available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {listings.map((listing) => (
              <div
                key={listing._id}
                className="border p-4 rounded-lg shadow-md bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/listing/${listing._id}`)}
              >
                {/* Display Image */}
                {listing.images.length > 0 && (
                  <img src={listing.images[0]} alt={listing.name} className="w-full h-48 object-cover rounded-md mb-4" />
                )}

                {/* Car Details */}
                <h2 className="text-xl font-semibold">{listing.name} ({listing.model})</h2>
                <p className="text-gray-600">Type: {listing.type}</p>
                <p className="text-gray-600">Manufacturer: {listing.manufacturer}</p>
                <p className="text-gray-600">Year: {listing.year}</p>
                <p className="text-gray-800 font-bold mt-2">${listing.pricePerDay} / day</p>
                <p className={`text-gray-600 ${listing.availability ? "text-green-600" : "text-red-600"}`}>
                  Availability: {listing.availability ? "Available" : "Unavailable"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminListings;
