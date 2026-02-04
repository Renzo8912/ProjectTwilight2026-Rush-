require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Item = require('./models/Item');

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); // Essential for reading req.body from your React form

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas!")) // Confirmed working in your terminal
  .catch(err => console.error("Database Connection Error:", err));

// Routes
app.get('/', (req, res) => {
    res.send('MERN Server is Live and Connected to MongoDB!');
});

// Optimized POST route with logging
app.post('/items', async (req, res) => {
    console.log("POST request received at /items"); // Debugging line
    console.log("Data received:", req.body);         // Shows you what React sent

    try {
        // Ensure name exists before saving
        if (!req.body.name) {
            return res.status(400).json({ message: "Item name is required" });
        }

        const newItem = new Item({
            name: req.body.name,
            quantity: req.body.quantity || 0 // Added fallback for quantity
        });

        const savedItem = await newItem.save();
        console.log("Item saved successfully:", savedItem);
        res.status(201).json(savedItem);
    } catch (err) {
        console.error("Save Error:", err.message);
        res.status(400).json({ message: err.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));