import React, { useState } from "react";
import axios from "axios";


const CarListing = () => {
    const [formData, setFormData] = useState({
        name: "",
        model: "",
        type: "",
        manufacturer: "",
        year: "",
        pricePerDay: "",
        availability: "",
        location: "",
        fuelType: "",
        transmission: "",
        seatingCapacity: "",
        doors: "",
        mileage: "",
        engineCapacity: "",
        features: "", // Store features as a string input
        images: [] // Store image URLs
    });

    const [selectedFiles, setSelectedFiles] = useState([]); // Store selected image files
    const [uploading, setUploading] = useState(false); // Track upload status

    const cloudName = "dgt2ucvec";  
    const uploadPreset = "okqngdax"; 

    // Function to upload images to Cloudinary
    const uploadImagesToCloudinary = async (files) => {
        const urls = [];

        setUploading(true);
        for (let file of files) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", uploadPreset);

            try {
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                    formData
                );
                urls.push(response.data.secure_url);
            } catch (error) {
                console.error("Image upload error:", error);
            }
        }
        setUploading(false);
        return urls;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files)); // Convert FileList to Array
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            let imageUrls = [];
            if (selectedFiles.length > 0) {
                imageUrls = await uploadImagesToCloudinary(selectedFiles);
            }
    
            const formDataToSend = {
                ...formData,
                year: Number(formData.year),
                pricePerDay: Number(formData.pricePerDay),
                seatingCapacity: Number(formData.seatingCapacity),
                doors: Number(formData.doors),
                mileage: Number(formData.mileage),
                engineCapacity: Number(formData.engineCapacity),
                features: formData.features.split(",").map(f => f.trim()), // Convert features to an array
                images: imageUrls // Ensure this is an array
            };
    
            console.log("Sending data:", formDataToSend); // Debugging
            await axios.post("http://localhost:8080/api/listings", formDataToSend);
            alert("Listing created successfully");
            window.location.reload();
        } catch (err) {
            console.error("Error creating listing:", err);
            alert("Error creating listing");
        }
    };
    
    
    return (
        <div>
            
            <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto", padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", borderRadius: "10px", backgroundColor: "#fff", paddingTop: "120px" }}>
                <h2 style={{ textAlign: "center" }}>Create Car Listing</h2>

                {Object.keys(formData).map((key) => (
                    key !== "features" && key !== "images" && (
                        <input
                            key={key}
                            type={key === "year" || key.includes("Capacity") || key === "pricePerDay" || key === "doors" || key === "mileage" ? "number" : "text"}
                            name={key}
                            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                            value={formData[key]}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc", boxSizing: "border-box" }}
                        />
                    )
                ))}

                {/* Features Input Field */}
                <div>
                    <h3>Features</h3>
                    <input 
                        type="text"
                        name="features"
                        placeholder="Enter features (comma separated)"
                        value={formData.features}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc", boxSizing: "border-box" }}
                    />
                    <small>Example: Air Conditioning, Sunroof, Bluetooth, Leather Seats</small>
                </div>

                <div>
                    <h3>Upload Images</h3>
                    <input type="file" id="imageUpload" multiple onChange={handleFileChange} style={{ marginBottom: "10px" }} />
                    {uploading && <p>Uploading images...</p>}
                </div>

                <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", marginTop: "20px" }}>Create Listing</button>
            </form>
        </div>
    );
};

export default CarListing;
