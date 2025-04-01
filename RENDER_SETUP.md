# PropXChain Render Deployment Guide

This guide explains how to deploy the PropXChain website with MongoDB integration on Render.

## Prerequisites

1. A Render account (https://render.com)
2. A MongoDB Atlas account with a cluster set up (https://www.mongodb.com/cloud/atlas)

## Deployment Steps

### 1. Create a Web Service on Render

1. Log in to your Render dashboard
2. Click on "New" and select "Web Service"
3. Connect your GitHub repository
4. Configure the following settings:
   - **Name**: PropXChain
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node render.js`
   - **Root Directory**: Leave empty (use the repository root)

### 2. Set Environment Variables

In the Render dashboard, navigate to your web service and go to the "Environment" tab. Add the following environment variables:

- `MONGODB_URI`: `mongodb+srv://marchatton:Marc2711@cluster0.elgpsni.mongodb.net/PropXChain`
- `NODE_ENV`: `production`

You can also add these optional email configuration variables if you want to enable email notifications:

- `EMAIL_SERVICE`: Your email service (e.g., gmail)
- `EMAIL_USER`: Your email address
- `EMAIL_PASSWORD`: Your email password or app password

### 3. Deploy

Click "Create Web Service" and Render will automatically deploy your application.

## Deployment

### Vercel Deployment

The project includes a Vercel deployment hook that automatically triggers a deployment when changes are pushed to GitHub. You can also manually trigger a deployment using the `trigger-vercel-deploy.bat` script.

### Testing the Deployment

Once deployed on both Vercel and Render, you can test the contact form by:

1. Visit your Render URL (e.g., https://propxchain.onrender.com or your custom domain)
2. Navigate to the Contact page
3. Fill out and submit the form
4. Check the MongoDB Atlas dashboard to verify that the submission was saved

## Troubleshooting

If you encounter any issues:

1. Check the Render logs for error messages
2. Verify that the MongoDB connection string is correct
3. Ensure that the MongoDB user has the correct permissions
4. Test the API endpoint directly: `https://your-render-url.onrender.com/api/contact`

## Contact Form Implementation

The contact form sends data to MongoDB using the following flow:

1. User submits the form on the contact page
2. JavaScript in `js/contact-form-js.js` captures the form data and sends it to the `/api/contact` endpoint
3. The server in `render.js` processes the request and saves the data to MongoDB Atlas
4. The server returns a success or error response to the client
5. The data is stored in the MongoDB Atlas database in the `contact` collection

## MongoDB Collection Structure

The contact form submissions are stored in the `contact` collection with the following schema:

```javascript
{
  name: String,
  email: String,
  company: String,
  phone: String,
  interest: String,
  message: String,
  submittedAt: Date
}
