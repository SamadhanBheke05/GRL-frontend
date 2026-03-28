document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            mobileMenuBtn.innerHTML = isExpanded ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Set Active Nav Link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Form Submission Handling
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = leadForm.querySelector('button[type="submit"]');
            const statusDiv = document.getElementById('form-status');
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            statusDiv.className = 'form-status';
            statusDiv.textContent = '';
            
            const formData = new FormData(leadForm);
            const data = Object.fromEntries(formData.entries());
            
            try {
                const response = await fetch('https://grl-backend.onrender.com/api/leads', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    statusDiv.className = 'form-status success';
                    statusDiv.textContent = 'Thank you! Your request has been submitted successfully. We will contact you soon.';
                    leadForm.reset();
                } else {
                    throw new Error(result.message || 'Something went wrong');
                }
            } catch (err) {
                statusDiv.className = 'form-status error';
                statusDiv.textContent = 'Sorry, there was an error submitting your request. Please try again or contact us directly.';
                console.error('Submission error:', err);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Request';
            }
        });
    }
});
