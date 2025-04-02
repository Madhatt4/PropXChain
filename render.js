// render.js - Entry point for PropXChain Render deployment
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://marchatton:Marc2711@cluster0.elgpsni.mongodb.net/PropXChain';

console.log('Attempting to connect to MongoDB...');
console.log('MongoDB URI:', MONGODB_URI ? `${MONGODB_URI.substring(0, 20)}...` : 'undefined');

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    console.log('Connection state:', mongoose.connection.readyState);
    console.log('Database name:', mongoose.connection.name);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.error('Error details:', err.toString());
  });

// Contact Form Submission Schema
const ContactSubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String },
  phone: { type: String },
  interest: { type: String },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
}, { collection: 'contact' }); // Explicitly set collection name to 'contact'

const ContactSubmission = mongoose.models.ContactSubmission || 
  mongoose.model('ContactSubmission', ContactSubmissionSchema);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure CORS to allow requests from the main website
app.use(cors({
  origin: '*', // Temporarily allow all origins for testing
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  // Log the request for debugging
  console.log('Received contact form submission:');
  console.log('Headers:', req.headers);
  console.log('Origin:', req.headers.origin);
  console.log('Body:', req.body);

  const { name, email, company, phone, interest, message } = req.body;
  
  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please provide name, email, and message' });
  }

  try {
    console.log('Attempting to save submission to MongoDB...');
    console.log('MongoDB connection state:', mongoose.connection.readyState);
    console.log('Form data:', { name, email, company, phone, interest });
    
    // Save submission to MongoDB
    const newSubmission = new ContactSubmission({
      name,
      email,
      company,
      phone,
      interest,
      message
    });
    
    await newSubmission.save();
    console.log('Form submission saved to database with ID:', newSubmission._id);
    console.log('Collection name:', ContactSubmission.collection.name);

    // Success response
    res.status(200).json({ success: true, message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Error processing form submission:', error);
    console.error('Error details:', error.toString());
    
    // Provide more specific error messages based on the error type
    if (error.name === 'MongooseError' || error.name === 'MongoError') {
      console.error('MongoDB error details:', {
        name: error.name,
        code: error.code,
        message: error.message,
        connectionState: mongoose.connection.readyState
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Test endpoint for the contact API
app.get('/api/contact', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Contact API endpoint is working!',
    timestamp: new Date().toISOString(),
    env: {
      mongodbUri: MONGODB_URI ? 'Set (first 10 chars): ' + MONGODB_URI.substring(0, 10) + '...' : 'Not set',
      nodeEnv: process.env.NODE_ENV || 'Not set'
    }
  });
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
