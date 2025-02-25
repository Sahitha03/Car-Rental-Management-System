const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb+srv://alurisaisahitha:Sahitha@cluster0.ihql5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to DB");
        await initDB(); // Ensure initDB completes after connection
    } catch (err) {
        console.error("Error connecting to DB:", err);
    }
}

const initDB = async () => {
    try {
        await Listing.deleteMany({}); // Clear existing data
        console.log("Old data deleted");

        // Check if initData.data is an array
        if (Array.isArray(initData.data)) {
            // Add the owner field to each listing
            const formattedData = initData.data.map((obj) => ({
                ...obj,
                // owner: "67273008da73f25254cd1264", // Add the owner field
            }));

            // Insert the data into the database
            await Listing.insertMany(formattedData);
            console.log("Data was initialized");
        } else {
            console.error("initData.data is not an array");
        }
    } catch (err) {
        console.error("Error initializing DB:", err);
    }
};

main(); // Start the process
