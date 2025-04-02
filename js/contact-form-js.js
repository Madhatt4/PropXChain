// Contact form handler with direct API submission
document.addEventListener('DOMContentLoaded', function() {
  console.log('Contact form handler loaded');
  
  // Check for success parameter in URL
  const urlParams = new URLSearchParams(window.location.search);
  const success = urlParams.get('success');
  
  if (success === 'true') {
    console.log('Success parameter found in URL');
    
    // Hide the form
    const form = document.getElementById('contact-form');
    if (form) {
      form.style.display = 'none';
    }
    
    // Show success message
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
      successMessage.style.display = 'block';
      
      // Scroll to success message
      successMessage.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  // Handle form submission
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      console.log('Form submitted');
      
      // Get form data
      const nameInput = form.querySelector('input[name="name"]');
      const emailInput = form.querySelector('input[name="email"]');
      const messageInput = form.querySelector('textarea[name="message"]');
      
      // Log form elements for debugging
      console.log('Form elements:', {
        nameInput,
        emailInput,
        messageInput,
        form
      });
      
      // Validate form data
      if (!nameInput || !emailInput || !messageInput) {
        console.error('Form elements not found');
        alert('Form error: Some form elements could not be found. Please try again or contact us directly at marchatton@hotmail.co.uk');
        return;
      }
      
      // Enhanced validation
      let validationError = '';
      if (!nameInput.value.trim()) {
        validationError = 'Please enter your name.';
      } else if (!emailInput.value.trim()) {
        validationError = 'Please enter your email address.';
      } else if (!isValidEmail(emailInput.value.trim())) { // Check email format
        validationError = 'Please enter a valid email address.';
      } else if (!messageInput.value.trim()) {
        validationError = 'Please enter your message.';
      }

      if (validationError) {
        console.error('Form validation failed:', validationError);
        alert(validationError); // Show specific error
        return;
      }
      
      // Prepare form data
      const formData = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value,
        company: document.querySelector('input[name="company"]')?.value || '',
        phone: document.querySelector('input[name="phone"]')?.value || '',
        interest: document.querySelector('input[name="interest"]')?.value || 'General Inquiry'
      };
      
      console.log('Form data:', formData);
      
      // Show loading state
      const button = form.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      button.textContent = 'Sending...';
      button.disabled = true;
      
      try {
        // Send data to API using XMLHttpRequest to avoid CORS issues
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://propxchain.onrender.com/api/contact', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onload = function() {
          console.log('XHR response status:', xhr.status);
          console.log('XHR response text:', xhr.responseText);
          
          if (xhr.status >= 200 && xhr.status < 300) {
            // Show success message
            form.style.display = 'none';
            const successMessage = document.getElementById('success-message');
            if (successMessage) {
              successMessage.style.display = 'block';
              successMessage.scrollIntoView({ behavior: 'smooth' });
            } else {
              alert('Message sent successfully!');
            }
          } else {
            alert('Error sending message. Please try again later.');
          }
          
          // Reset button
          button.textContent = originalText;
          button.disabled = false;
        };
        
        xhr.onerror = function() {
          console.error('XHR error');
          alert('Error sending message. Please try again later.');
          
          // Reset button
          button.textContent = originalText;
          button.disabled = false;
        };
        
        xhr.send(JSON.stringify(formData));
      } catch (error) {
        console.error('Error:', error);
        alert('Error sending message. Please try again later.');
        
        // Reset button
        button.textContent = originalText;
        button.disabled = false;
      }
    });
  } else {
    console.error('Contact form not found');
  }
});

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
