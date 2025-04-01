// JavaScript to handle the contact form submission
// Version: 1.0.1 - Updated to fix MongoDB integration
document.addEventListener('DOMContentLoaded', function() {
  console.log('Contact form handler loaded');
  
  // Try to find the contact form using different selectors
  let contactForm = document.getElementById('contact-form');
  
  // If not found by ID, try other selectors
  if (!contactForm) {
    console.log('Contact form not found by ID, trying alternative selectors');
    // Try to find any form on the page
    const allForms = document.querySelectorAll('form');
    if (allForms.length > 0) {
      console.log(`Found ${allForms.length} forms on the page`);
      // Use the first form found
      contactForm = allForms[0];
    } else {
      console.error('No forms found on the page');
    }
  } else {
    console.log('Contact form found by ID');
  }
  
  // Only proceed if the contact form exists
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Only validate the name field for now
      const nameInput = document.getElementById('name');
      let isValid = true;
      
      // Debug information
      console.log('Name input found:', !!nameInput);
      if (nameInput) {
        console.log('Name input value:', nameInput.value);
      }
      
      if (!nameInput || !nameInput.value.trim()) {
        if (nameInput) {
          nameInput.classList.add('error');
        }
        isValid = false;
      } else {
        nameInput.classList.remove('error');
      }
      
      if (!isValid) {
        showMessage('Please enter your name.', 'error');
        return;
      }
      
      // Get email and message inputs if they exist
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      // Super simplified form data - include only what we can find
      const formData = {
        name: nameInput.value.trim(),
        email: emailInput && emailInput.value ? emailInput.value.trim() : 'test@example.com',
        message: messageInput && messageInput.value ? messageInput.value.trim() : 'Test message from ' + nameInput.value.trim(),
        company: '',
        phone: '',
        interest: 'General Inquiry'
      };
      
      console.log('Form data prepared:', formData);
      
      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.innerHTML = 'Sending...';
      submitButton.disabled = true;
      
      try {
        // Log form data for debugging
        console.log('Form data to be submitted:', {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          interest: formData.interest,
          message: formData.message.substring(0, 20) + '...' // Log just the beginning of the message
        });
        
        // First, test if the API endpoint is reachable
        let apiEndpointReachable = false;
        try {
          console.log('Testing API health endpoint...');
          const testResponse = await fetch('https://propxchain.onrender.com/api/health', {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
          });
          console.log('API health check response:', testResponse.status);
          if (testResponse.ok) {
            console.log('API endpoint is reachable');
            apiEndpointReachable = true;
          } else {
            console.warn('API endpoint health check failed with status:', testResponse.status);
          }
        } catch (healthCheckError) {
          console.error('API health check failed:', healthCheckError);
        }
        
        // Determine the API endpoint based on the current environment
        let apiEndpoint = 'https://propxchain.onrender.com/api/contact';
        
        // Check if we're running locally
        const isLocalhost = window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1';
        
        if (isLocalhost) {
          console.log('Running locally, will try local endpoint first');
          try {
            // Try local endpoint first
            const localResponse = await fetch('http://localhost:3000/api/contact', {
              method: 'HEAD',
              mode: 'no-cors'
            });
            console.log('Local endpoint check response:', localResponse);
            apiEndpoint = 'http://localhost:3000/api/contact';
          } catch (localCheckError) {
            console.log('Local endpoint not available, using Render endpoint');
          }
        }
        
        // If API is not reachable, show a message but still try to submit
        if (!apiEndpointReachable && !isLocalhost) {
          console.warn('API endpoint may not be reachable, but will still attempt submission');
          showMessage('Warning: The server may be temporarily unavailable, but we will still try to send your message.', 'warning');
        }
        
        console.log('Using API endpoint:', apiEndpoint);
        
        console.log('About to send fetch request to:', apiEndpoint);
        console.log('With data:', JSON.stringify(formData, null, 2));
        
        // Add a small delay to show loading state
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Try multiple endpoints to ensure the form data is sent
        const endpoints = [
          apiEndpoint,
          'https://propxchain.onrender.com/api/contact',
          'https://propxchain.com/api/contact'
        ];
        
        let response = null;
        let lastError = null;
        
        // Try each endpoint until one succeeds
        for (const endpoint of endpoints) {
          console.log(`Attempting to send data to endpoint: ${endpoint}`);
          
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
            
            // Send form data to backend
            const fetchResponse = await fetch(endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData),
              // Add these options to ensure the request completes
              mode: 'cors',
              cache: 'no-cache',
              credentials: 'same-origin',
              redirect: 'follow',
              referrerPolicy: 'no-referrer-when-downgrade',
              signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            // If this endpoint succeeded, use this response
            if (fetchResponse.ok) {
              console.log(`Successfully sent data to endpoint: ${endpoint}`);
              response = fetchResponse;
              break;
            } else {
              console.warn(`Endpoint ${endpoint} returned status: ${fetchResponse.status}`);
              // Keep the response even if it's not OK, in case all endpoints fail
              if (!response) {
                response = fetchResponse;
              }
            }
          } catch (fetchError) {
            console.error(`Error with endpoint ${endpoint}:`, fetchError);
            lastError = fetchError;
          }
        }
        
        // If all endpoints failed and we don't have a response, throw the last error
        if (!response && lastError) {
          throw lastError;
        } else if (!response) {
          throw new Error('All endpoints failed to respond');
        }
        
        console.log('Fetch request completed');
        console.log('Response status:', response.status);
        console.log('Response headers:', [...response.headers.entries()]);
        
        // Parse the JSON response
        let result;
        try {
          const text = await response.text();
          console.log('Raw response text:', text);
          result = text ? JSON.parse(text) : {};
        } catch (parseError) {
          console.error('Error parsing response:', parseError);
          throw new Error('Invalid response from server: ' + parseError.message);
        }
        
        // Log detailed response information
        console.log('Server response status:', response.status);
        console.log('Server response OK:', response.ok);
        console.log('Server response body:', result);
        
        if (response.ok) {
          // Success
          showMessage('Your message has been sent successfully! We will get back to you soon.', 'success');
          contactForm.reset();
        } else {
          // Server returned an error
          console.error('Server error response:', result);
          showMessage(result.message || 'Failed to send your message. Please try again later.', 'error');
        }
      } catch (error) {
        // Network or other error
        console.error('Error submitting form:', error.toString());
        console.error('Error details:', error);
        showMessage('An error occurred. Please try again later or contact us directly.', 'error');
      } finally {
        // Reset button state
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
      }
    });
  }
  
  // Helper function to validate email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Function to show messages to the user
  function showMessage(message, type) {
    try {
      // Check if a message element already exists
      let messageElement = document.getElementById('form-message');
      
      // If not, create one
      if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.id = 'form-message';
        
        // Make sure contactForm exists before using it
        if (contactForm && contactForm.parentNode) {
          contactForm.insertAdjacentElement('beforebegin', messageElement);
        } else {
          // Fallback - append to body
          document.body.appendChild(messageElement);
        }
      }
      
      // Set appropriate class and content
      messageElement.className = `message ${type}`;
      messageElement.textContent = message;
      
      // Scroll to the message
      messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Automatically remove success messages after 5 seconds
      if (type === 'success') {
        setTimeout(() => {
          messageElement.remove();
        }, 5000);
      }
    } catch (error) {
      console.error('Error showing message:', error);
    }
  }
});
