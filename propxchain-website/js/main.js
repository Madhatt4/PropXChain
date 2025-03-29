// PropXchain Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navList = document.querySelector('.nav-list');
  
  if (mobileMenuToggle && navList) {
    mobileMenuToggle.addEventListener('click', function() {
      navList.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });
  }
  
  // ROI Calculator
  const roiCalculator = document.getElementById('roi-calculator');
  if (roiCalculator) {
    const calculateButton = document.getElementById('calculate-roi');
    const propertyUnitsInput = document.getElementById('property-units');
    const averagePriceInput = document.getElementById('average-price');
    const currentTimeInput = document.getElementById('current-time');
    
    const timeSavingsResult = document.getElementById('time-savings');
    const costSavingsResult = document.getElementById('cost-savings');
    const totalSavingsResult = document.getElementById('total-savings');
    const fallThroughResult = document.getElementById('fall-through-reduction');
    
    calculateButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get input values
      const propertyUnits = parseInt(propertyUnitsInput.value) || 0;
      const averagePrice = parseInt(averagePriceInput.value) || 0;
      const currentTime = parseInt(currentTimeInput.value) || 0;
      
      // Calculate results
      const newTime = 3.5; // 3-4 weeks average
      const timeSavings = currentTime - newTime;
      const timeSavingsPercentage = (timeSavings / currentTime * 100).toFixed(0);
      
      const conventionalCost = 3825; // £3,825 average transaction cost
      const propXchainCost = 1975; // £1,975 average transaction cost
      const costSavingsPerProperty = conventionalCost - propXchainCost;
      const totalCostSavings = costSavingsPerProperty * propertyUnits;
      
      const conventionalFallThrough = 0.28; // 28% average fall-through rate
      const propXchainFallThrough = 0.10; // 10% estimated fall-through rate
      const fallThroughReduction = ((conventionalFallThrough - propXchainFallThrough) * 100).toFixed(0);
      const additionalSales = Math.round(propertyUnits * (conventionalFallThrough - propXchainFallThrough));
      const additionalRevenue = additionalSales * averagePrice;
      
      // Display results
      timeSavingsResult.textContent = `${timeSavingsPercentage}% (${timeSavings.toFixed(1)} weeks per property)`;
      costSavingsResult.textContent = `£${costSavingsPerProperty.toLocaleString()} per property (£${totalCostSavings.toLocaleString()} total)`;
      fallThroughResult.textContent = `${fallThroughReduction}% (${additionalSales} additional completions)`;
      totalSavingsResult.textContent = `£${totalCostSavings.toLocaleString()} direct costs + £${additionalRevenue.toLocaleString()} from reduced fall-through`;
      
      // Show results
      document.getElementById('calculator-results').style.display = 'block';
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Form validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      // Simple validation
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
      
      if (isValid) {
        // In a real implementation, this would submit the form
        // For now, just show a success message
        const formContent = contactForm.innerHTML;
        contactForm.innerHTML = '<div class="success-message"><h3>Thank you for your message!</h3><p>We will get back to you shortly.</p></div>';
        
        // Reset form after 5 seconds (for demo purposes)
        setTimeout(() => {
          contactForm.innerHTML = formContent;
        }, 5000);
      }
    });
  }
  
  // Helper function to validate email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Animate elements when they come into view
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  if (animateElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
      observer.observe(element);
    });
  }
  
  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle current item
        item.classList.toggle('active');
      });
    });
  }
  
  // Testimonial Slider
  const testimonialSlider = document.querySelector('.testimonial-slider');
  if (testimonialSlider) {
    const testimonials = testimonialSlider.querySelectorAll('.testimonial');
    const prevButton = testimonialSlider.querySelector('.slider-prev');
    const nextButton = testimonialSlider.querySelector('.slider-next');
    let currentIndex = 0;
    
    function showTestimonial(index) {
      testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
      });
    }
    
    if (prevButton && nextButton && testimonials.length > 0) {
      showTestimonial(currentIndex);
      
      prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
      });
      
      nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
      });
      
      // Auto-advance every 5 seconds
      setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
      }, 5000);
    }
  }
});
