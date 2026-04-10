const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Control access from different origins/domains
const dotenv = require('dotenv'); // Store sensitive data like MongoDB string
const DonorRoute = require('./Routes/DonorRoute');
const AdminRoute = require('./Routes/AdminRoute');

dotenv.config(); // Load environment variables first

const app = express();

// Use PORT from environment or fallback to 4000
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json()); // for parsing application/json
app.use(cors()); // allow all origins (you can restrict if needed)

// Routes
app.use('/donor', DonorRoute);
app.use('/admin', AdminRoute);

// MongoDB connection using env variable
// If running in Docker and MongoDB container, DATABASE_STRING should point to Mongo service
const mongoURI = process.env.DATABASE_STRING || 'mongodb://host.docker.internal:27017/bloodbank';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to the Blood Bank Database"))
.catch(err => console.error("MongoDB connection error:", err));

// Test route
app.get('/', (req, res) => {
    res.send("This is the backend server for the Blood Bank Management System");
});

// Start server
app.listen(PORT, () => {
    console.log(`Backend Server is running on port ${PORT}`);
});