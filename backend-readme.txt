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

4. Edit the `.env` file with your email service details:
   ```
   PORT=3000
   EMAIL_SERVICE=gmail  # Change to your email provider
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ```

   **Note:** If using Gmail, you'll need to use an App Password. Generate one at: https://myaccount.google.com/apppasswords

### 3. Starting the Server

For development:
```
npm run dev
```

For production:
```
npm start
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

## Updating Your Contact Form

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

You can test your contact form submission endpoint with curl:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"This is a test message"}' \
  http://localhost:3000/api/contact
```

## Security Considerations

- Use HTTPS in production
- Store your environment variables securely
- Consider implementing rate limiting to prevent abuse
- Use a CSRF token for additional form security
