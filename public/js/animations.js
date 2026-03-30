/* 
   Ghanshyam Roadlines Pune - Animation Control System
   Optimized for Performance and UX
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. Reveal on Scroll (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animating only once
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of element is visible
    });

    revealElements.forEach(el => observer.observe(el));

    // 2. Button Scale Click Feedback (Manual scale up/down if needed)
    // Most handled by CSS :hover and :active in animations.css for performance

    // 3. Smooth Navigation Transitions
    const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="tel:"]):not([href^="mailto:"])');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.href;
            if (href && !href.includes(window.location.host)) return; // External link
            
            e.preventDefault();
            
            // Add fade-out transition
            document.body.classList.add('page-exit-active');
            
            // Wait for animation, then navigate
            setTimeout(() => {
                window.location.href = href;
            }, 300); // Duration match anim-duration
        });
    });

    // 4. Preloader Control
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 300); // 300ms min delay for smooth experience
        });
    }

    // 5. Scroll Performance Fix: Throttling some handlers if they ever existed
    // For now, only using lightweight CSS-based animations
});
