/* ============================================
   SKYLARC WEBSITE - SHARED SCRIPT
   Navigation & Interactive Functionality
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initPastAuctionFilters();
});

/**
 * Initialize navigation with mobile menu toggle and active link highlighting
 */
function initNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.navbar__link');

  function closeNavMenu() {
    if (!hamburger || !navMenu) return;
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  // Mobile menu toggle
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
    });
  }

  // Close mobile menu when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (hamburger && hamburger.classList.contains('active')) {
        closeNavMenu();
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (hamburger && navMenu && 
        !hamburger.contains(e.target) && 
        !navMenu.contains(e.target) &&
        hamburger.classList.contains('active')) {
      closeNavMenu();
    }
  });

  // Reset dropdown menu when leaving tablet/mobile breakpoints
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
      closeNavMenu();
    }
  });

  // Set active nav link based on current page
  setActiveNavLink();
}

function initPastAuctionFilters() {
  const toolbar = document.querySelector('.past-auction-toolbar--collapsible');
  const toggleButton = toolbar ? toolbar.querySelector('[data-filter-toggle]') : null;

  if (!toolbar || !toggleButton) return;

  const syncToolbarState = () => {
    if (window.innerWidth > 1024) {
      toolbar.classList.remove('filters-open');
      toggleButton.setAttribute('aria-expanded', 'false');
    }
  };

  toggleButton.addEventListener('click', function() {
    const isOpen = toolbar.classList.toggle('filters-open');
    toggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.addEventListener('click', function(event) {
    if (window.innerWidth > 1024) return;
    if (!toolbar.contains(event.target)) {
      toolbar.classList.remove('filters-open');
      toggleButton.setAttribute('aria-expanded', 'false');
    }
  });

  window.addEventListener('resize', syncToolbarState);
  syncToolbarState();
}

/**
 * Set active navigation link based on current page URL
 */
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.classList.remove('active');

    const href = link.getAttribute('href');

    // Check if link matches current page
    if (currentPath.includes(href.replace('.html', '').replace('./', '')) ||
        (href === 'index.html' && currentPath === '/') ||
        (href === './' && currentPath === '/')) {
      link.classList.add('active');
    }
  });
}

/**
 * Modal functionality
 */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Close modal when clicking outside content
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

/**
 * Smooth scroll to section
 */
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Image lazy loading
 */
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

/**
 * Format price for display
 */
function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

/**
 * Format date for display
 */
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Handle form submission
 */
function handleFormSubmit(formElement, callback) {
  if (!formElement) return;

  formElement.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData);

    // Basic validation
    if (isFormValid(data)) {
      if (callback) {
        callback(data);
      } else {
        // Default: show success message
        showNotification('Form submitted successfully!', 'success');
        formElement.reset();
      }
    }
  });
}

/**
 * Validate form data
 */
function isFormValid(data) {
  for (let key in data) {
    if (data[key].trim() === '') {
      showNotification(`${key} is required`, 'error');
      return false;
    }
  }
  return true;
}

/**
 * Show notification/toast message
 */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Trigger animation
  setTimeout(() => notification.classList.add('show'), 10);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Modal functionality
 */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Close modal when clicking outside content
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

/**
 * Smooth scroll to section
 */
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Image lazy loading
 */
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

/**
 * Format price for display
 */
function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

/**
 * Format date for display
 */
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Handle form submission
 */
function handleFormSubmit(formElement, callback) {
  if (!formElement) return;

  formElement.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData);

    // Basic validation
    if (isFormValid(data)) {
      if (callback) {
        callback(data);
      } else {
        // Default: show success message
        showNotification('Form submitted successfully!', 'success');
        formElement.reset();
      }
    }
  });
}

/**
 * Validate form data
 */
function isFormValid(data) {
  for (let key in data) {
    if (data[key].trim() === '') {
      showNotification(`${key} is required`, 'error');
      return false;
    }
  }
  return true;
}

/**
 * Show notification/toast message
 */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Trigger animation
  setTimeout(() => notification.classList.add('show'), 10);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
