// JavaScript to handle the contact form submission
document.addEventListener('DOMContentLoaded', function() {
  // Find the contact form
  const contactForm = document.getElementById('contact-form');
  
  // Debug information
  console.log('Contact form found:', !!contactForm);
  
  // Only proceed if the contact form exists
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Basic client-side validation
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      let isValid = true;
      
      if (!nameInput.value.trim()) {
        nameInput.classList.add('error');
        isValid = false;
      } else {
        nameInput.classList.remove('error');
      }
      
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        emailInput.classList.add('error');
        isValid = false;
      } else {
        emailInput.classList.remove('error');
      }
      
      if (!messageInput.value.trim()) {
        messageInput.classList.add('error');
        isValid = false;
      } else {
        messageInput.classList.remove('error');
      }
      
      if (!isValid) {
        showMessage('Please fill in all required fields correctly.', 'error');
        return;
      }
      
      // Prepare form data with null checks
      const companyElement = document.getElementById('company');
      const phoneElement = document.getElementById('phone');
      const interestElement = document.getElementById('interest');
      
      console.log('Form elements found:', {
        name: !!nameInput,
        email: !!emailInput,
        company: !!companyElement,
        phone: !!phoneElement,
        interest: !!interestElement,
        message: !!messageInput
      });
      
      const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        company: companyElement ? companyElement.value.trim() : '',
        phone: phoneElement ? phoneElement.value.trim() : '',
        interest: interestElement ? interestElement.value : 'General Inquiry',
        message: messageInput.value.trim()
      };
      
      console.log('Form data prepared:', formData);
      
      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.innerHTML = 'Sending...';
      submitButton.disabled = true;
      
      try {
        // Determine the API endpoint based on the current environment
        // Always use the Render endpoint for now to ensure it works
        const apiEndpoint = 'https://propxchain.onrender.com/api/contact';
        
        console.log('Sending form data to:', apiEndpoint);
        
        // Send form data to backend
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
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
