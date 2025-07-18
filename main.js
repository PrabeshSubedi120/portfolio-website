// Modern Portfolio JavaScript

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

// Mobile Navigation Toggle
navToggle?.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Custom cursor movement
document.addEventListener('mousemove', (e) => {
  if (cursor && cursorFollower) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
      cursorFollower.style.left = e.clientX + 'px';
      cursorFollower.style.top = e.clientY + 'px';
    }, 100);
  }
});

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .service-card, .portfolio-item');
hoverElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    cursor?.classList.add('cursor-hover');
    cursorFollower?.classList.add('cursor-hover');
  });
  
  element.addEventListener('mouseleave', () => {
    cursor?.classList.remove('cursor-hover');
    cursorFollower?.classList.remove('cursor-hover');
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      navLink?.classList.add('active');
    }
  });
}

window.addEventListener('scroll', highlightNavigation);

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
    }
  });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .skill-item, .contact-item');
animateElements.forEach(element => {
  observer.observe(element);
});

// Form submission
// REMOVE the following block to allow Formspree to work:
// const contactForm = document.querySelector('.contact-form');
// contactForm?.addEventListener('submit', (e) => {
//   e.preventDefault();
  
//   // Get form data
//   const formData = new FormData(contactForm);
//   const formObject = {};
//   formData.forEach((value, key) => {
//     formObject[key] = value;
//   });
  
//   // Simulate form submission
//   const submitButton = contactForm.querySelector('button[type="submit"]');
//   const originalText = submitButton.textContent;
  
//   submitButton.textContent = 'Sending...';
//   submitButton.disabled = true;
  
//   setTimeout(() => {
//     submitButton.textContent = 'Message Sent!';
//     setTimeout(() => {
//       submitButton.textContent = originalText;
//       submitButton.disabled = false;
//       contactForm.reset();
//     }, 2000);
//   }, 1500);
// });

// Typing animation for hero subtitle
const typeWriter = (element, text, speed = 100) => {
  let i = 0;
  element.textContent = '';
  
  const timer = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
};

// Initialize typing animation when page loads
window.addEventListener('load', () => {
  const subtitleElement = document.querySelector('.subtitle-text');
  if (subtitleElement) {
    const originalText = subtitleElement.textContent;
    setTimeout(() => {
      typeWriter(subtitleElement, originalText, 80);
    }, 1000);
  }
});

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const shapes = document.querySelectorAll('.shape');
  
  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.5;
    shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
  });
});

// Portfolio filter functionality (if needed in future)
const portfolioFilters = document.querySelectorAll('.portfolio-filter');
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioFilters.forEach(filter => {
  filter.addEventListener('click', () => {
    const filterValue = filter.getAttribute('data-filter');
    
    // Remove active class from all filters
    portfolioFilters.forEach(f => f.classList.remove('active'));
    filter.classList.add('active');
    
    // Filter portfolio items
    portfolioItems.forEach(item => {
      if (filterValue === 'all' || item.classList.contains(filterValue)) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 100);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Skills progress animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillsSection = document.querySelector('.skills-grid');

if (skillsSection) {
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillBars.forEach(bar => {
          const progress = bar.getAttribute('data-progress');
          bar.style.width = progress + '%';
        });
      }
    });
  }, { threshold: 0.5 });
  
  skillsObserver.observe(skillsSection);
}

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Preloader (if you want to add one)
const preloader = document.querySelector('.preloader');
if (preloader) {
  window.addEventListener('load', () => {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  });
}

// Back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: var(--shadow-medium);
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.style.opacity = '1';
    backToTopButton.style.visibility = 'visible';
  } else {
    backToTopButton.style.opacity = '0';
    backToTopButton.style.visibility = 'hidden';
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Add hover effect to back to top button
backToTopButton.addEventListener('mouseenter', () => {
  backToTopButton.style.transform = 'translateY(-3px)';
});

backToTopButton.addEventListener('mouseleave', () => {
  backToTopButton.style.transform = 'translateY(0)';
});

console.log('Portfolio website loaded successfully! 🚀');

// Portfolio Lightbox and Sharing - Initialize when ready
function initializePortfolioFunctionality() {
  
  // Portfolio data for navigation
  const portfolioData = [
    {
      image: 'img/1.jpg',
      title: 'Kanxi Barah Temple',
      description: 'Photography Project - Lumle'
    },
    {
      image: 'img/2.jpg',
      title: 'Lakeside Night View',
      description: 'Urban Photography'
    },
    {
      image: 'img/3.jpg',
      title: 'Jaljala Stream',
      description: 'Nature Photography'
    },
    {
      image: 'img/4.jpg',
      title: 'Davi\'s Fall',
      description: 'Landscape Photography'
    },
    {
      image: 'img/5.jpg',
      title: 'View from Kaskikot',
      description: 'Mountain Photography'
    },
    {
      image: 'img/6.jpg',
      title: 'Kaski, Naudada',
      description: 'Rural Photography'
    }
  ];

  let currentImageIndex = 0;

  // Lightbox Elements
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDescription = document.getElementById('lightbox-description');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxOverlay = document.querySelector('.lightbox-overlay');

  // Share Modal Elements
  const shareModal = document.getElementById('share-modal');
  const shareClose = document.getElementById('share-close');
  const shareOverlay = document.querySelector('.share-overlay');
  const shareFacebook = document.getElementById('share-facebook');
  const shareTwitter = document.getElementById('share-twitter');
  const shareLinkedIn = document.getElementById('share-linkedin');
  const shareWhatsApp = document.getElementById('share-whatsapp');
  const shareTelegram = document.getElementById('share-telegram');
  const copyLinkBtn = document.getElementById('copy-link');

  let currentShareData = {};

  // Check if elements exist before adding event listeners
  if (lightboxModal && shareModal) {
    console.log('Portfolio elements found, initializing functionality...');
    
    // Open Lightbox
    function openLightbox(data) {
      lightboxImage.src = data.image;
      lightboxImage.alt = data.title;
      lightboxTitle.textContent = data.title;
      lightboxDescription.textContent = data.description;
      
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      updateLightboxControls();
    }

    // Close Lightbox
    function closeLightbox() {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Update Lightbox Controls
    function updateLightboxControls() {
      lightboxPrev.disabled = currentImageIndex === 0;
      lightboxNext.disabled = currentImageIndex === portfolioData.length - 1;
    }

    // Navigate Lightbox
    function navigateLightbox(direction) {
      if (direction === 'prev' && currentImageIndex > 0) {
        currentImageIndex--;
      } else if (direction === 'next' && currentImageIndex < portfolioData.length - 1) {
        currentImageIndex++;
      }
      
      const data = portfolioData[currentImageIndex];
      lightboxImage.src = data.image;
      lightboxImage.alt = data.title;
      lightboxTitle.textContent = data.title;
      lightboxDescription.textContent = data.description;
      
      updateLightboxControls();
    }

    // Open Share Modal
    function openShareModal() {
      shareModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      setupShareLinks();
    }

    // Close Share Modal
    function closeShareModal() {
      shareModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Setup Share Links
    function setupShareLinks() {
      const { title, image, url } = currentShareData;
      const shareText = `Check out this amazing photo: ${title}`;
      
      // Facebook
      if (shareFacebook) shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`;
      
      // Twitter
      if (shareTwitter) shareTwitter.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
      
      // LinkedIn
      if (shareLinkedIn) shareLinkedIn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
      
      // WhatsApp
      if (shareWhatsApp) shareWhatsApp.href = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + url)}`;
      
      // Telegram
      if (shareTelegram) shareTelegram.href = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`;
    }

    // Copy Link Functionality
    function copyToClipboard() {
      const textToCopy = window.location.href;
      
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast('Link copied to clipboard!');
        }).catch(() => {
          fallbackCopyTextToClipboard(textToCopy);
        });
      } else {
        fallbackCopyTextToClipboard(textToCopy);
      }
    }

    // Fallback copy function
    function fallbackCopyTextToClipboard(text) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.position = 'fixed';
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        showToast('Link copied to clipboard!');
      } catch (err) {
        showToast('Failed to copy link');
      }
      
      document.body.removeChild(textArea);
    }

    // Show Toast Notification
    function showToast(message) {
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = message;
      
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.classList.add('show');
      }, 100);
      
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
          if (document.body.contains(toast)) {
            document.body.removeChild(toast);
          }
        }, 300);
      }, 3000);
    }
    
    // View Button Functionality
    document.querySelectorAll('.view-btn').forEach((btn, index) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('View button clicked for image:', index);
        currentImageIndex = index;
        openLightbox(portfolioData[index]);
      });
    });

    // Share Button Functionality
    document.querySelectorAll('.share-btn').forEach((btn, index) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Share button clicked for image:', index);
        currentShareData = {
          title: portfolioData[index].title,
          image: portfolioData[index].image,
          url: window.location.href
        };
        openShareModal();
      });
    });

    // Event Listeners
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => navigateLightbox('prev'));
    if (lightboxNext) lightboxNext.addEventListener('click', () => navigateLightbox('next'));

    if (shareClose) shareClose.addEventListener('click', closeShareModal);
    if (shareOverlay) shareOverlay.addEventListener('click', closeShareModal);
    if (copyLinkBtn) copyLinkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      copyToClipboard();
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
      if (lightboxModal && lightboxModal.classList.contains('active')) {
        switch (e.key) {
          case 'Escape':
            closeLightbox();
            break;
          case 'ArrowLeft':
            navigateLightbox('prev');
            break;
          case 'ArrowRight':
            navigateLightbox('next');
            break;
        }
      }
      
      if (shareModal && shareModal.classList.contains('active')) {
        if (e.key === 'Escape') {
          closeShareModal();
        }
      }
    });

    // Prevent modal content clicks from closing modal
    const lightboxContainer = document.querySelector('.lightbox-container');
    const shareContainer = document.querySelector('.share-container');
    
    if (lightboxContainer) {
      lightboxContainer.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    if (shareContainer) {
      shareContainer.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    // Open share links in new window
    document.querySelectorAll('.share-option[href]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(link.href, '_blank', 'width=600,height=400');
        closeShareModal();
      });
    });

    console.log('Portfolio lightbox and sharing functionality loaded! 📸');
    
  } else {
    console.error('Portfolio modal elements not found!');
  }
  
}

// Initialize portfolio functionality when DOM is ready
console.log('Document ready state:', document.readyState);

if (document.readyState === 'loading') {
  console.log('DOM still loading, waiting for DOMContentLoaded...');
  document.addEventListener('DOMContentLoaded', initializePortfolioFunctionality);
} else {
  console.log('DOM already loaded, initializing immediately...');
  initializePortfolioFunctionality();
}