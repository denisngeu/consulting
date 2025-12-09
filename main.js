// BON‑Energy Consulting – Script principal

// Exécuter une fois que le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  // Navigation mobile : ouverture/fermeture
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Animation d’apparition : IntersectionObserver
  const fadeElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
  const appearObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  fadeElements.forEach(el => {
    appearObserver.observe(el);
  });

  // Compteurs animés dans le hero
  const counters = document.querySelectorAll('.badge-number');
  const animateCounters = () => {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      let count = 0;
      const duration = 2000;
      const interval = 50;
      const increment = target / (duration / interval);
      const updateCount = () => {
        count += increment;
        if (count >= target) {
          counter.textContent = target;
        } else {
          counter.textContent = Math.floor(count);
          setTimeout(updateCount, interval);
        }
      };
      updateCount();
    });
  };
  // Observer pour démarrer les compteurs lorsque l’élément est visible
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  const badgesContainer = document.querySelector('.hero-badges');
  if (badgesContainer) {
    counterObserver.observe(badgesContainer);
  }

  // Formulaire de contact : affichage d’un message de succès
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simulation d’envoi : on affiche un message et on réinitialise
      formSuccess.hidden = false;
      contactForm.reset();
    });
  }

  // Mise à jour de l’année dans le footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});