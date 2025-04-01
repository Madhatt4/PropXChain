# PropXchain Backend Server for Render

This is a dedicated backend server for handling PropXchain contact form submissions. It's designed to be deployed on Render.com to provide a reliable connection to MongoDB for storing form submissions.

## Why a Separate Backend?

Serverless functions (like those on Vercel) can sometimes have issues with MongoDB connections due to:
- Cold starts causing connection delays
- Connection timeouts in serverless environments
- Network restrictions in some serverless platforms

A dedicated backend on Render provides:
- Persistent connections to MongoDB
- More reliable database operations
- Better error handling and logging

## Deployment Instructions for Render

1. Create a new Web Service on Render
   - Sign up or log in to [Render](https://render.com)
   - Click "New" and select "Web Service"
   - Connect your GitHub repository or upload the files directly

2. Configure the Web Service
   - **Name**: propxchain-backend (or your preferred name)
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or select a paid plan for production use)

3. Add Environment Variables
   - Click on "Environment" and add the following variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `EMAIL_SERVICE`: Your email service (e.g., "outlook", "gmail")
     - `EMAIL_USER`: Your email address
     - `EMAIL_PASSWORD`: Your email password or app password
     - `NODE_ENV`: Set to "production" for production deployment

4. Deploy the Service
   - Click "Create Web Service"
   - Render will build and deploy your application

5. Note Your Service URL
   - Once deployed, Render will provide a URL for your service (e.g., `https://propxchain-backend.onrender.com`)
   - You'll need this URL to update your frontend code

## Updating the Frontend

After deploying the backend to Render, you need to update your frontend code to send form submissions to the Render backend instead of the Vercel serverless function:

1. Update the fetch URL in `js/contact-form-js.js` to point to your Render backend:
   ```javascript
   const response = await fetch('https://your-render-backend-url.onrender.com/api/contact', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(formData)
   });
   ```

2. Deploy the updated frontend to Vercel

## Local Development

To run the backend server locally:

1. Clone the repository
2. Create a `.env` file with the required environment variables
3. Install dependencies: `npm install`
4. Start the server: `npm run dev`

The server will run on port 4000 by default (http://localhost:4000).
