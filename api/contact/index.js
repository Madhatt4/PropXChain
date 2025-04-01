import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB Connection
let dbConnected = false;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://marchatton:Marc2711@cluster0.elgpsni.mongodb.net/PropXChain';

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

// Only create the model if it doesn't exist
const ContactSubmission = mongoose.models.ContactSubmission || 
  mongoose.model('ContactSubmission', ContactSubmissionSchema);

// Connect to MongoDB
const connectDB = async () => {
  if (dbConnected) {
    console.log('MongoDB already connected, connection state:', mongoose.connection.readyState);
    return;
  }
  
  console.log('Attempting to connect to MongoDB...');
  console.log('MongoDB URI:', MONGODB_URI ? `${MONGODB_URI.substring(0, 20)}...` : 'undefined');
  
  try {
    await mongoose.connect(MONGODB_URI);
    dbConnected = true;
    console.log('MongoDB connected successfully');
    console.log('Connection state:', mongoose.connection.readyState);
    console.log('Database name:', mongoose.connection.name);
    console.log('Available collections:', await mongoose.connection.db.listCollections().toArray());
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.error('Error details:', error.toString());
    console.error('Connection state after error:', mongoose.connection.readyState);
  }
};

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

export default async function handler(req, res) {
  // Set CORS headers for specific origins
  const allowedOrigins = ['https://www.propxchain.com', 'https://propxchain.com', 'http://localhost:3000'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  // Log the request for debugging
  console.log('Received contact form submission:');
  console.log('Headers:', req.headers);
  console.log('Origin:', req.headers.origin);
  console.log('Body:', req.body);

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Add a test endpoint for GET requests
  if (req.method === 'GET') {
    return res.status(200).json({ 
      success: true, 
      message: 'Contact API endpoint is working!',
      timestamp: new Date().toISOString(),
      env: {
        mongodbUri: MONGODB_URI ? 'Set (first 10 chars): ' + MONGODB_URI.substring(0, 10) + '...' : 'Not set',
        emailService: process.env.EMAIL_SERVICE || 'Not set',
        emailUser: process.env.EMAIL_USER ? 'Set' : 'Not set',
        emailPassword: process.env.EMAIL_PASSWORD ? 'Set' : 'Not set'
      }
    });
  }

  // Only allow POST for form submissions
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Connect to database
  await connectDB();

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
};
