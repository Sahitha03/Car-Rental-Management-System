import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/listings/${id}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setListing(data);
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };
    fetchListing();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await fetch(`http://localhost:8080/api/listings/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        navigate("/admin/listings"); // Redirect after deletion
      } catch (error) {
        console.error("Error deleting listing:", error);
      }
    }
  };

  if (!listing) {
    return <p className="text-center text-gray-500">Loading listing details...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">{listing.name} ({listing.model})</h1>

        {/* Image Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {listing.images.map((image, index) => (
            <img key={index} src={image} alt={listing.name} className="w-full h-40 object-cover rounded-md" />
          ))}
        </div>

        {/* Car Details */}
        <div className="mt-6 space-y-2">
          <p className="text-gray-600">Type: {listing.type}</p>
          <p className="text-gray-600">Manufacturer: {listing.manufacturer}</p>
          <p className="text-gray-600">Year: {listing.year}</p>
          <p className="text-gray-800 font-bold">${listing.pricePerDay} / day</p>
          <p className={`text-gray-600 ${listing.availability ? "text-green-600" : "text-red-600"}`}>
            Availability: {listing.availability ? "Available" : "Unavailable"}
          </p>
          <p className="text-gray-600">Pickup: {listing.pickupLocation}</p>
          <p className="text-gray-600">Dropoff: {listing.dropoffLocation || "Not Specified"}</p>
          <p className="text-gray-600">Fuel: {listing.fuelType}</p>
          <p className="text-gray-600">Transmission: {listing.transmission}</p>
          <p className="text-gray-600">Seats: {listing.seatingCapacity} | Doors: {listing.doors}</p>
          <p className="text-gray-600">Mileage: {listing.mileage || "N/A"}</p>
          <p className="text-gray-600">Engine: {listing.engineCapacity || "N/A"}</p>
        </div>

        {/* Features */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Features:</h3>
          <ul className="list-disc ml-5 text-gray-600">
            {listing.features.length > 0 ? (
              listing.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))
            ) : (
              <li>No features listed</li>
            )}
          </ul>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => navigate(`/editlisting/${listing._id}`)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
