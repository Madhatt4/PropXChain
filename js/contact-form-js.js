// Simple script to check for success parameter in URL
document.addEventListener('DOMContentLoaded', function() {
  console.log('Contact page loaded');
  
  // Check for success parameter in URL
  const urlParams = new URLSearchParams(window.location.search);
  const success = urlParams.get('success');
  
  if (success === 'true') {
    console.log('Success parameter found in URL');
    
    // Hide the form
    const form = document.querySelector('.contact-form-container');
    if (form) {
      form.style.display = 'none';
    }
    
    // Show success message
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
      successMessage.style.display = 'block';
    }
  }
});
