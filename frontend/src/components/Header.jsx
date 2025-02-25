import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CarRentalNavbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Function to fetch user data
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/profile", {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error) {
      setUser(null); // Reset user if not logged in
      console.error("Error fetching user:", error);
    }
  };

  // Fetch user profile on mount and set up polling every 5 seconds
  useEffect(() => {
    fetchUser(); // Initial fetch
    const interval = setInterval(fetchUser, 5000); // Poll every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8080/api/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("user");
      localStorage.removeItem("userId");

      user?.role === "admin" ? navigate("/admin") : navigate("/login");

      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/car.png" alt="Logo" className="h-10 w-auto mr-2" />
          <span className="text-2xl font-bold text-gray-800">CarRental</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          <Link to="/carlistings" className="text-gray-600 hover:text-gray-900">Browse Cars</Link>
          <Link to="/my-bookings" className="text-gray-600 hover:text-gray-900">My Bookings</Link>

          {user ? (
            user.role === "admin" ? (
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 px-4 py-2 bg-red-100 rounded-md"
              >
                Logout
              </button>
            ) : (
              <div className="relative">
                {/* Profile Picture - Click to toggle dropdown */}
                <button
                  onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                  aria-label="Profile Menu"
                >
                  <img
                    src={user?.profilePicture || "/profile.png"}
                    alt="Profile"
                    className="h-10 w-10 rounded-full border-2 border-gray-200 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/profile.png";
                    }}
                  />
                </button>

                {/* Dropdown Menu (Only visible when profile is clicked) */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                    >
                      Update Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )
          ) : (
            <div className="flex space-x-4">
              <Link to="/signup" className="text-gray-600 hover:text-gray-900">Signup</Link>
              <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-600 hover:text-gray-900"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Mobile Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu with Smooth Transition */}
      <div className={`md:hidden bg-white px-4 pb-4 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <Link to="/" className="block py-2 text-gray-600 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>Home</Link>
        <Link to="/carlistings" className="block py-2 text-gray-600 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>Browse Cars</Link>
        <Link to="/my-bookings" className="block py-2 text-gray-600 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>My Bookings</Link>
        
        {user ? (
          <>
            <Link 
              to="/profile" 
              className="block py-2 text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Update Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left py-2 text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" className="block py-2 text-gray-600 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>Signup</Link>
            <Link to="/login" className="block py-2 text-gray-600 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default CarRentalNavbar;
