// JavaScript to handle the contact form submission
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  
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
      
      // Prepare form data
      const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        company: document.getElementById('company').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        interest: document.getElementById('interest').value,
        message: messageInput.value.trim()
      };
      
      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.innerHTML = 'Sending...';
      submitButton.disabled = true;
      
      try {
        // Send form data to backend
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
          // Success
          showMessage('Your message has been sent successfully! We will get back to you soon.', 'success');
          contactForm.reset();
        } else {
          // Server returned an error
          showMessage(result.message || 'Failed to send your message. Please try again later.', 'error');
        }
      } catch (error) {
        // Network or other error
        console.error('Error submitting form:', error);
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
    // Check if a message element already exists
    let messageElement = document.getElementById('form-message');
    
    // If not, create one
    if (!messageElement) {
      messageElement = document.createElement('div');
      messageElement.id = 'form-message';
      contactForm.insertAdjacentElement('beforebegin', messageElement);
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
  }
});
