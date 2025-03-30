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

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, company, phone, interest, message } = req.body;
  
  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please provide name, email, and message' });
  }

  try {
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

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'marchatton@hotmail.co.uk',
      subject: `PropXchain Contact Form: ${interest || 'General Inquiry'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Interest:</strong> ${interest || 'Not specified'}</p>
        <h3>Message:</h3>
        <p>${message}</p>
        <p><em>This submission has been saved to the database with ID: ${newSubmission._id}</em></p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    // Send auto-response to the submitter
    const autoResponseOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting PropXchain',
      html: `
        <h2>Thank You for Contacting PropXchain</h2>
        <p>Dear ${name},</p>
        <p>We have received your inquiry. A member of our team will get back to you within 24 hours.</p>
        <p>Here's a summary of your message:</p>
        <p><strong>Interest:</strong> ${interest || 'General Inquiry'}</p>
        <p><strong>Message:</strong> ${message}</p>
        <br>
        <p>Best regards,</p>
        <p>The PropXchain Team</p>
      `,
    };

    await transporter.sendMail(autoResponseOptions);

    // Success response
    res.status(200).json({ success: true, message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Error processing form submission:', error);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
  }
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
