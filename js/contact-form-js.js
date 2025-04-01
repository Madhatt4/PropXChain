// Ultra simple contact form handler
document.addEventListener('DOMContentLoaded', function() {
  console.log('Simple contact form handler loaded');
  
  // Find the form
  const form = document.querySelector('.simple-form');
  
  if (!form) {
    console.log('Simple form not found');
    return;
  }
  
  console.log('Simple form found');
  
  // Add submit event listener
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Form submitted');
    
    // Get form data
    const formData = {
      name: form.querySelector('[name="user_name"]').value,
      email: form.querySelector('[name="user_email"]').value,
      message: form.querySelector('[name="user_message"]').value,
      // Add required fields for MongoDB schema
      company: '',
      phone: '',
      interest: 'General Inquiry'
    };
    
    console.log('Form data:', formData);
    
    // Show loading state
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;
    
    // Send data to API using XMLHttpRequest to avoid CORS preflight issues
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://propxchain.com/api/contact', true);
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
    
    /* Using fetch (commented out due to CORS issues)
    fetch('https://propxchain.com/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      console.log('Response status:', response.status);
      return response.text().then(text => {
        return text ? { text, status: response.status } : { text: '', status: response.status };
      });
    })
    .then(({ text, status }) => {
      console.log('Response text:', text);
      
      // Show success message
      if (status >= 200 && status < 300) {
        form.style.display = 'none';
        document.getElementById('success-message').style.display = 'block';
      } else {
        alert('Error sending message. Please try again later.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error sending message. Please try again later.');
    })
    .finally(() => {
      // Reset button
      button.textContent = originalText;
      button.disabled = false;
    });
    */
  });
});
