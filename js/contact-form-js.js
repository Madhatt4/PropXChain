// JavaScript to handle the contact form submission
document.addEventListener('DOMContentLoaded', function() {
  console.log('Contact form handler loaded');
  
  // Find the contact form
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) {
    console.error('Contact form not found on the page');
    return;
  }
  
  console.log('Contact form found:', contactForm);
  
  // Add submit event listener
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log('Form submitted');
    
    // Get form elements directly from the form
    console.log('Form elements:', contactForm.elements);
    
    // Get form elements by their index or name
    const nameInput = contactForm.elements[0] || contactForm.elements['name'];
    const emailInput = contactForm.elements[1] || contactForm.elements['email'];
    const messageInput = contactForm.elements[2] || contactForm.elements['message'];
    
    console.log('Form inputs found:', {
      nameInput: nameInput ? `Found (${nameInput.name || 'unnamed'})` : 'Not found',
      emailInput: emailInput ? `Found (${emailInput.name || 'unnamed'})` : 'Not found',
      messageInput: messageInput ? `Found (${messageInput.name || 'unnamed'})` : 'Not found'
    });
    
    // Check if elements exist
    if (!nameInput || !emailInput || !messageInput) {
      console.error('Form elements not found using direct access');
      
      // Last resort: get all inputs in the form
      const inputs = contactForm.querySelectorAll('input, textarea');
      console.log(`Found ${inputs.length} inputs in form`);
      
      if (inputs.length >= 3) {
        // Assume first input is name, second is email, third is message
        nameInput = inputs[0];
        emailInput = inputs[1];
        messageInput = inputs[2];
        console.log('Using inputs by position in form');
      } else {
        alert('Form error: Could not find all required form elements');
        return;
      }
    }
    
    // Get values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    
    // Validate
    if (!name || !email || !message) {
      console.error('Validation failed:', { name, email, message: message ? 'provided' : 'missing' });
      alert('Please fill out all required fields');
      return;
    }
    
    const formData = {
      name,
      email,
      message,
      company: '',
      phone: '',
      interest: 'General Inquiry'
    };
    
    console.log('Form data prepared:', formData);
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.innerHTML : 'Send Message';
    if (submitButton) {
      submitButton.innerHTML = 'Sending...';
      submitButton.disabled = true;
    }
    
    try {
      // Use the full URL to the API endpoint
      const apiUrl = 'https://propxchain.com/api/contact';
      console.log('Submitting to API:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      console.log('Response status:', response.status);
      
      let result;
      try {
        const text = await response.text();
        console.log('Response text:', text);
        result = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        result = { message: 'Invalid response from server' };
      }
      
      if (response.ok) {
        console.log('Submission successful');
        alert('Message sent successfully!');
        contactForm.reset();
      } else {
        console.error('Server returned error:', result);
        alert('Error: ' + (result.message || 'Failed to send message'));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error sending message. Please try again later.');
    } finally {
      // Reset button state
      if (submitButton) {
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
      }
    }
  });
});
