// Backend server for PropXchain contact form
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure CORS to allow requests from your Vercel frontend
app.use(cors({
  origin: ['https://propxchain.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
console.log('Attempting to connect to MongoDB...');
console.log('MongoDB URI:', MONGODB_URI ? 'Set' : 'Not set');

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
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
}, { collection: 'contact' });

const ContactSubmission = mongoose.model('ContactSubmission', ContactSubmissionSchema);

// Email transport configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    message: 'PropXchain contact form API is running',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    env: {
      mongodb_uri: process.env.MONGODB_URI ? 'Set' : 'Not set',
      email_service: process.env.EMAIL_SERVICE ? 'Set' : 'Not set',
      email_user: process.env.EMAIL_USER ? 'Set' : 'Not set',
      email_password: process.env.EMAIL_PASSWORD ? 'Set' : 'Not set'
    }
  });
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission:', req.body);
  
  const { name, email, company, phone, interest, message } = req.body;
  
  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please provide name, email, and message' });
  }

  try {
    console.log('Attempting to save submission to MongoDB...');
    
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

    // Create email transporter
    const transporter = createTransporter();

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
      `
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
      `
    };

    await transporter.sendMail(autoResponseOptions);

    // Success response
    res.status(200).json({ success: true, message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
