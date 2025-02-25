import { useEffect, useState } from "react";
import axios from "axios";
import { Camera, User } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    profilePicture: "",
  });

  const [updatedUser, setUpdatedUser] = useState({});
 const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/profile", { withCredentials: true });
        console.log("Profile Data:", response.data); // Debugging
        if (typeof response.data === "object" && response.data !== null) {
          setUser(response.data);
          setUpdatedUser(response.data || {});
        } else {
          console.error("Unexpected API response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);
  

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };
  

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:8080/api/profile", updatedUser, { withCredentials: true });
      console.log("Updated Profile Response:", response.data); // Debugging
      if (typeof response.data === "object" && response.data !== null) {
        setUser(response.data);
        alert("Profile updated successfully!");
      } else {
        console.error("Unexpected API response:", response.data);
        alert("Failed to update profile. Unexpected response.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };
  
  

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image first.");
      return;
    }
  

    const formData = new FormData();
    formData.append("profilePicture", image);

    try {
      const response = await axios.post("http://localhost:8080/api/upload-profile-pic", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser({ ...user, profilePicture: response.data.profilePicture });
      alert("Profile picture updated!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-400 to-green-600 px-6 py-8">
          <div className="flex flex-col items-center">
            <div className="relative">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center">
                  <User className="w-16 h-16 text-gray-400" />
                </div>
              )}
              <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <Camera className="w-5 h-5 text-green-600" />
              </label>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-white">{user.username || 'Your Profile'}</h2>
          </div>
        </div>

        <div className="px-6 py-8">
          <form onSubmit={handleImageUpload} className="mb-8">
            <input
              id="profile-upload"
              type="file"
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
            {image && (
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Upload New Profile Picture
              </button>
            )}
          </form>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={updatedUser.username || ""}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email || ""}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={updatedUser.phone || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={updatedUser.address || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;