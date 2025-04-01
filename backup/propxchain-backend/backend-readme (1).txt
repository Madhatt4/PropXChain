# PropXchain Contact Form Backend

This is an Express.js backend for handling contact form submissions from the PropXchain website. It stores submissions in MongoDB and forwards them to your email address.

## Features

- Receives form submissions from the website
- Stores all submissions in MongoDB database
- Validates form data
- Sends email notifications to info@propxchain.com
- Sends confirmation emails to users who submit the form
- Provides a secure admin interface to view past submissions
- CORS-enabled for secure cross-origin requests

## Setup Instructions

### 1. Prerequisites

- Node.js (v14 or later)
- npm (Node Package Manager)
- Email account for sending notifications

### 2. Installation

1. Clone this repository or copy the files to your server

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file by copying the template:
   ```
   cp .env.template .env
   ```

4. Edit the `.env` file with your MongoDB and email service details:
   ```
   PORT=3000
   MONGODB_URI=mongodb+srv://marchatton:Marc2711@cluster0.elgpsni.mongodb.net/propxchain
   EMAIL_SERVICE=gmail  # Change to your email provider
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=secure_password_here
   ```

   **Note:** If using Gmail, you'll need to use an App Password. Generate one at: https://myaccount.google.com/apppasswords
   
5. Set up secure admin credentials for accessing the submissions dashboard

### 3. Starting the Server

For development:
```
npm run dev
```

For production:
```
npm start
```

## MongoDB Setup

The backend is already configured to use your MongoDB Atlas cluster with the connection string:

```
mongodb+srv://marchatton:Marc2711@cluster0.elgpsni.mongodb.net/propxchain
```

If you need to use a different MongoDB instance:

1. Create a MongoDB Atlas account or set up a local MongoDB server
2. Create a database named "propxchain"
3. Update the MONGODB_URI in your .env file
4. The system will automatically create a "contactsubmissions" collection

### Data Storage

Each form submission is stored with the following schema:

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
```

## Deployment Options

### Option 1: Deploy to a VPS or Dedicated Server

1. Set up a Node.js environment on your server
2. Clone this repository to your server
3. Install dependencies with `npm install`
4. Set up environment variables
5. Use PM2 or similar to keep the process running:
   ```
   npm install -g pm2
   pm2 start server.js --name propxchain-backend
   ```
6. Set up Nginx or Apache as a reverse proxy
7. Deploy the admin.html file to your server

### Option 2: Deploy to Heroku

1. Create a Heroku account and install the Heroku CLI
2. Initialize a git repository if you haven't already:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Create a Heroku app:
   ```
   heroku create propxchain-backend
   ```
4. Set environment variables:
   ```
   heroku config:set EMAIL_SERVICE=gmail
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASSWORD=your-app-password
   ```
5. Deploy:
   ```
   git push heroku main
   ```

### Option 3: Deploy to Vercel

1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```
2. Create a `vercel.json` file:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server.js"
       }
     ]
   }
   ```
3. Deploy:
   ```
   vercel
   ```
4. Set environment variables in the Vercel dashboard

## Admin Dashboard

This backend includes a simple admin dashboard to view all form submissions:

1. Deploy the `admin.html` file along with your backend
2. Access it at `https://your-backend-url.com/admin.html`
3. Log in using the admin credentials you set in the `.env` file
4. View, search, and manage all form submissions
5. Each submission is stored in MongoDB and also sent via email

### Admin Dashboard Features

- Secure login with HTTP Basic Authentication
- View all form submissions in a paginated table
- See full details of each submission
- Responsive design that works on mobile and desktop
- Secure storage of credentials in localStorage for convenience

## Setting Up Your Contact Form

Update your contact.html file to include the contact-form.js script and point to your backend URL:

1. Add the script tag at the end of your HTML file, just before the closing </body> tag:
   ```html
   <script src="js/contact-form.js"></script>
   ```

2. Update the contact-form.js file with your backend URL:
   ```javascript
   const response = await fetch('https://your-backend-url.com/api/contact', {
   ```

3. Include the form-styles.css in your HTML:
   ```html
   <link rel="stylesheet" href="css/form-styles.css">
   ```

## Testing

### Testing the Contact Form Endpoint

You can test your contact form submission endpoint with curl:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"This is a test message"}' \
  http://localhost:3000/api/contact
```

### Testing MongoDB Connection

To verify the MongoDB connection is working correctly:

```bash
curl http://localhost:3000/api/health
```

This should return something like:

```json
{
  "status": "ok",
  "mongodb": "connected"
}
```

### Testing Admin API Access

To test the admin API for retrieving submissions:

```bash
curl -u admin:your_password http://localhost:3000/api/submissions
```

Replace `admin:your_password` with your actual admin credentials.

## Security Considerations

- Use HTTPS in production
- Store your environment variables securely
- Consider implementing rate limiting to prevent abuse
- Use a CSRF token for additional form security
- Always use strong passwords for admin access
- Regularly change admin credentials
- Consider IP restrictions for admin access
- Ensure MongoDB connection string is kept private
- Use MongoDB Atlas security features like IP whitelisting
- Keep all dependencies updated
