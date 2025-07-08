// Performance optimization utilities for SEO and Core Web Vitals

export function preloadCriticalResources() {
  // Preload critical CSS and JavaScript
  const criticalResources = [
    '/fonts/inter.woff2',
    '/favicon.ico',
    '/images/logo.png'
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    
    if (resource.includes('.woff2') || resource.includes('.woff')) {
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
    } else if (resource.includes('.css')) {
      link.as = 'style';
    } else if (resource.includes('.js')) {
      link.as = 'script';
    } else {
      link.as = 'image';
    }
    
    document.head.appendChild(link);
  });
}

export function optimizeImages() {
  // Lazy load images below the fold
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src || '';
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

export function enableServiceWorker() {
  // Register service worker for caching and offline functionality
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  }
}

export function measureCoreWebVitals() {
  // Measure Core Web Vitals for SEO
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  });
}

export function optimizeForSEO() {
  // Initialize all performance optimizations
  preloadCriticalResources();
  optimizeImages();
  enableServiceWorker();
  measureCoreWebVitals();
}