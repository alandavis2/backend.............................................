const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
const allowedOrigins = [
  "https://tenant-sphere.vercel.app",
  "http://localhost:5173",
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use('/ann/user', userRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));