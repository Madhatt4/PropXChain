// JavaScript to handle the contact form submission
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      if (!nameInput.value || !emailInput.value || !messageInput.value) {
        alert('Please fill out all required fields');
        return;
      }
      
      const formData = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
      };
      
      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.innerHTML = 'Sending...';
      submitButton.disabled = true;
      
      try {
        console.log('Submitting form data:', formData);
        
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
          alert('Message sent successfully!');
          contactForm.reset();
        } else {
          alert('Error: ' + (result.message || 'Failed to send message'));
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error sending message. Please try again later.');
      } finally {
        // Reset button state
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
      }
    });
  } else {
    console.error('Contact form not found');
  }
});
