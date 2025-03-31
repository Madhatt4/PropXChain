// server.js - Backend for PropXchain website and portal
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection (optional for Vercel deployment)
let dbConnected = false;
const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('MongoDB connected');
      dbConnected = true;
    })
    .catch(err => console.error('MongoDB connection error:', err));
}

// Contact Form Submission Schema
const ContactSubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String },
  phone: { type: String },
  interest: { type: String },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

const ContactSubmission = mongoose.model('ContactSubmission', ContactSubmissionSchema);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Email transport configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, // e.g., 'gmail', 'outlook', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Contact form submission endpoint - MOVED TO SERVERLESS FUNCTION
// This endpoint has been moved to /api/contact/index.js
// The route is now handled by the serverless function
app.post('/api/contact', async (req, res) => {
  res.status(301).json({ 
    success: false, 
    message: 'This endpoint has been moved to a serverless function. If you see this message, update your vercel.json routing configuration.' 
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// GET endpoint to retrieve submissions (protected with basic auth)
app.get('/api/submissions', async (req, res) => {
  // Basic authentication check
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="PropXchain Admin"');
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }
  
  // Parse credentials
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');
  
  // Check credentials against environment variables
  if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  
  try {
    // Retrieve submissions with pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const submissions = await ContactSubmission.find()
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await ContactSubmission.countDocuments();
    
    res.status(200).json({
      success: true,
      data: submissions,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error retrieving submissions:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve submissions' });
  }
});

// Catch-all route to handle client-side routing
app.get('*', (req, res) => {
  // If the request is for the demo portal, serve the demo index.html
  if (req.path.startsWith('/demo')) {
    return res.sendFile(path.join(__dirname, 'demo', 'index.html'));
  }
  
  // Otherwise, serve the main index.html
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
