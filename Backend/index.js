const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors') //Used for controlling the access to the server from different origins or domains
const dotenv = require('dotenv') //Used for storing the sensitive data in the .env file including my mongoDB string
const DonorRoute = require('./Routes/DonorRoute')
const AdminRoute = require('./Routes/AdminRoute')

const app = express();
const PORT = 4000;

app.use(express.json()) // for parsing application/json
app.use(cors())

app.use('/donor', DonorRoute)
app.use('/admin', AdminRoute)

dotenv.config()

mongoose.connect(process.env.DATABASE_STRING)
.then(() => {
    console.log("Connected to the Blood Bank Database")
})

app.get('/', (req, res) => {
    res.send("This is the backend server for the Blood Bank Management System")
})

app.listen(PORT, () => {
    console.log(`Backend Server is running on port ${PORT}`)
})

