import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, TextField, Card, CardContent, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const EditCarListing = () => {
    const { id } = useParams();
    
    // Separate state for form data and selected files
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
        features: [],
        images: []
    });

    const [selectedFiles, setSelectedFiles] = useState([]); // New image files
    const [existingImages, setExistingImages] = useState([]); // Already uploaded images
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/listings/${id}`);
                setFormData(response.data);
                setExistingImages(response.data.images || []); // Store existing image URLs separately
            } catch (error) {
                console.error("Error fetching listing:", error);
            }
        };
        fetchListing();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
    };

    const handleFeatureChange = (e, index) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = e.target.value;
        setFormData((prevData) => ({ ...prevData, features: newFeatures }));
    };

    const handleAddFeature = () => {
        setFormData((prevData) => ({
            ...prevData,
            features: [...prevData.features, ""],
        }));
    };

    const handleRemoveFeature = (index) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData((prevData) => ({ ...prevData, features: newFeatures }));
    };

    // Function to upload images to Cloudinary
    const uploadImagesToCloudinary = async (files) => {
        const urls = [];
        const uploadPreset = "okqngdax"; // Your Cloudinary upload preset
        const cloudName = "dgt2ucvec";  // Your Cloudinary cloud name
    
        setUploading(true);
    
        for (let file of files) {
            const imageData = new FormData();
            imageData.append("file", file);
            imageData.append("upload_preset", uploadPreset);
    
            try {
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/dgt2ucvec/image/upload`, // Corrected URL
                    imageData
                );
                urls.push(response.data.secure_url);
            } catch (error) {
                console.error("Image upload error:", error);
            }
        }
    
        setUploading(false);
        return urls;
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let imageUrls = [...existingImages]; // Keep existing images

            // If new images are selected, upload them
            if (selectedFiles.length > 0) {
                const uploadedUrls = await uploadImagesToCloudinary(selectedFiles);
                imageUrls = [...imageUrls, ...uploadedUrls]; // Combine old & new images
            }

            const updatedData = {
                ...formData,
                features: formData.features.join(","), // Convert array to comma-separated string
                images: imageUrls, // Updated images
            };

            await axios.put(`http://localhost:8080/api/listings/${id}`, updatedData);

            alert("Listing updated successfully");
        } catch (err) {
            console.error("Error updating listing:", err);
            alert("Error updating listing");
        }
    };

    return (
        <Card style={{ maxWidth: "500px", margin: "0 auto", padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "10px", backgroundColor: "#fff", paddingTop: "120px" }}>
            <CardContent>
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Edit Car Listing</h2>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth label="Car Name" name="name" value={formData.name} onChange={handleChange} required margin="dense" />
                    <TextField fullWidth label="Model" name="model" value={formData.model} onChange={handleChange} required margin="dense" />
                    <TextField fullWidth label="Type" name="type" value={formData.type} onChange={handleChange} required margin="dense" />
                    <TextField fullWidth label="Manufacturer" name="manufacturer" value={formData.manufacturer} onChange={handleChange} required margin="dense" />
                    <TextField fullWidth label="Year" type="number" name="year" value={formData.year} onChange={handleChange} required margin="dense" />
                    <TextField fullWidth label="Price Per Day" type="number" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} required margin="dense" />

                    <FormControl fullWidth margin="dense">
                        <InputLabel>Fuel Type</InputLabel>
                        <Select name="fuelType" value={formData.fuelType} onChange={handleChange}>
                            <MenuItem value="Petrol">Petrol</MenuItem>
                            <MenuItem value="Diesel">Diesel</MenuItem>
                            <MenuItem value="Electric">Electric</MenuItem>
                            <MenuItem value="Hybrid">Hybrid</MenuItem>
                        </Select>
                    </FormControl>

                    <h3>Features</h3>
                    {formData.features.map((feature, index) => (
                        <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "5px" }}>
                            <TextField fullWidth value={feature} onChange={(e) => handleFeatureChange(e, index)} required />
                            <Button variant="contained" color="error" onClick={() => handleRemoveFeature(index)}>Remove</Button>
                        </div>
                    ))}
                    <Button variant="contained" onClick={handleAddFeature}>Add Feature</Button>

                    <h3>Uploaded Images</h3>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        {existingImages.map((img, index) => (
                            <img key={index} src={img} alt="Car" width="100" height="100" style={{ borderRadius: "5px", border: "1px solid #ddd" }} />
                        ))}
                    </div>

                    <h3>Upload New Images</h3>
                    <input type="file" multiple accept="image/*" onChange={handleImageChange} />
                    {uploading && <p>Uploading images...</p>}

                    <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: "20px" }}>
                        Update Listing
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default EditCarListing;
