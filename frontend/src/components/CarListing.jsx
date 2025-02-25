import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchList from "./Search";
import { FaMapMarkerAlt, FaCar, FaRupeeSign } from "react-icons/fa";

const CarListings = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: "",
    location: "",
  });
  const [sortOrder, setSortOrder] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/listings")
      .then((response) => {
        setListings(response.data);
        setFilteredListings(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching listings:", err);
        setError("Unable to fetch listings");
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    let filtered = listings;

    if (filters.type) {
      filtered = filtered.filter((listing) =>
        listing.type?.toLowerCase().includes(filters.type.toLowerCase())
      );
    }

    if (filters.location) {
      filtered = filtered.filter((listing) =>
        listing.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredListings(filtered);
  };

  const handleSort = (order) => {
    setSortOrder(order);

    const sortedListings = [...filteredListings].sort((a, b) => {
      if (order === "low-to-high") {
        return a.pricePerDay - b.pricePerDay;
      } else if (order === "high-to-low") {
        return b.pricePerDay - a.pricePerDay;
      }
      return 0;
    });

    setFilteredListings(sortedListings);
  };

  return (
    <div className="container mx-auto px-4">
      {/* Search Bar and Sorting Options */}
      <div className="pt-20 pb-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-4">
          {/* Search Bar - Centered */}
          <div className="flex-grow flex justify-center w-full md:w-auto">
            <SearchList setFilters={setFilters} handleSearch={handleSearch} />
          </div>

          {/* Sorting Dropdown - Right aligned */}
          <div className="w-full md:w-auto">
            <select
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 text-sm cursor-pointer bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={sortOrder}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center text-gray-700 text-xl font-semibold">
          Loading car listings...
        </div>
      )}

      {/* Error State */}
      {error && (
        <p className="text-center text-red-500 text-xl font-semibold">{error}</p>
      )}

      {/* Car Listings */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8" style={{paddingTop:"55px"}}>
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <div
                key={listing._id}
                className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg 
                   bg-white shadow-md rounded-md overflow-hidden cursor-pointer border border-gray-200 
                   w-full max-w-[350px] h-[350px] flex flex-col mx-auto"
                onClick={() => navigate(`/carlistings/${listing._id}`)}
              >
                <img
                  src={
                    listing.images[0] ||
                    "https://english.cdn.zeenews.com/sites/default/files/2024/01/31/1356621-toyota-urban-hyryder.jpg"
                  }
                  alt={`${listing.make} ${listing.model}`}
                  className="w-full h-[180px] object-cover"
                />

                <div className="p-4 flex flex-col flex-grow justify-between text-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {listing.make} {listing.model}
                    </h2>
                    <p className="text-gray-500">{listing.name}</p>
                  </div>

                  <div className="mt-2 flex flex-wrap justify-center gap-4 text-gray-600 text-sm">
                    <p className="flex items-center gap-1">
                      <FaCar /> {listing.model}
                    </p>
                    <p className="flex items-center gap-1">
                      <FaRupeeSign /> {listing.pricePerDay.toLocaleString("en-IN")}/day
                    </p>
                    <p className="flex items-center gap-1">
                      <FaMapMarkerAlt /> {listing.location}
                    </p>
                  </div>

                  <button className="mt-3 bg-blue-600 text-white font-bold text-sm rounded-md hover:bg-blue-700 transition-all px-3 py-1 self-center">
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-xl col-span-full">
              No listings found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CarListings;