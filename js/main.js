// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

if (mobileToggle && navLinks) {
mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Animate elements on scroll
document.querySelectorAll('.offer-card, .evidence-item, .process-step, .mini-panel, .contact-card').forEach(el => {
    el.classList.add('animate-in');
    observer.observe(el);
});

// Stagger animation for grid items
document.querySelectorAll('.offer-grid, .evidence-grid, .process-grid, .mini-grid').forEach(grid => {
    const cards = grid.querySelectorAll('.animate-in');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form handling with Formspree
const contactForm = document.getElementById('contactForm');
function trackEvent(name, props = {}) {
    if (window.plausible) {
        window.plausible(name, { props });
    }
}

document.querySelectorAll('a[href="#contact"], a[href="/#contact"]').forEach(link => {
    link.addEventListener('click', () => trackEvent('Scoping CTA Click', {
        page: window.location.pathname || '/',
        label: link.textContent.trim()
    }));
});

document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => trackEvent('Email CTA Click', {
        page: window.location.pathname || '/',
        email: link.getAttribute('href').replace('mailto:', '')
    }));
});

if (contactForm) {
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    const status = this.querySelector('[data-form-status]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    if (status) {
        status.textContent = '';
        status.className = 'form-status';
    }

    const formData = new FormData(this);

    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            trackEvent('Contact Form Submit', {
                page: window.location.pathname || '/',
                service: String(formData.get('service') || 'not_selected')
            });
            btn.textContent = 'Message Sent!';
            btn.style.background = '#10B981';
            if (status) {
                status.textContent = 'Thanks. Your request was sent successfully.';
                status.classList.add('success');
            }
            this.reset();
        } else {
            throw new Error('Form submission failed');
        }
    }).catch((error) => {
        btn.textContent = 'Try Again';
        if (status) {
            status.textContent = 'Sorry, the message did not send. Please email contact@aicloudstrategist.com directly.';
            status.classList.add('error');
        }
        console.error(error);
    }).finally(() => {
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    });
});
}

// Counter animation for stats
function animateCounters() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const text = stat.textContent;
        // Only animate numbers
        const match = text.match(/^(\d+)/);
        if (match) {
            const target = parseInt(match[1]);
            const suffix = text.replace(match[1], '');
            let current = 0;
            const increment = target / 40;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = text;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + suffix;
                }
            }, 30);
        }
    });
}

// Trigger counter animation when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    heroObserver.observe(heroStats);
}

// Optional Vapi widget bootstrap
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function mountVapiWidget(config) {
    if (!config || !config.enabled || !config.publicKey || !config.assistantId) {
        return;
    }

    if (document.querySelector('vapi-widget')) {
        return;
    }

    const widget = document.createElement('vapi-widget');
    widget.setAttribute('public-key', config.publicKey);
    widget.setAttribute('assistant-id', config.assistantId);
    widget.setAttribute('mode', config.mode || 'chat');
    widget.setAttribute('theme', config.theme || 'dark');
    widget.setAttribute('size', config.size || 'compact');
    widget.setAttribute('position', config.position || 'bottom-right');
    widget.setAttribute('radius', config.radius || 'large');
    widget.setAttribute('base-color', config.baseColor || '#071827');
    widget.setAttribute('accent-color', config.accentColor || '#2de2c5');
    widget.setAttribute('button-base-color', config.buttonBaseColor || '#071827');
    widget.setAttribute('button-accent-color', config.buttonAccentColor || '#ffffff');
    widget.setAttribute('main-label', config.mainLabel || 'Talk with AICloudStrategist');
    widget.setAttribute('start-button-text', config.startButtonText || 'Start Voice Chat');
    widget.setAttribute('end-button-text', config.endButtonText || 'End Call');
    widget.setAttribute('empty-chat-message', config.emptyChatMessage || 'Hi. Ask about DPDP readiness, PolicyKart, or booking a scoping call.');
    widget.setAttribute('empty-voice-message', config.emptyVoiceMessage || 'Start a voice conversation with AICloudStrategist.');

    if (config.requireConsent) {
        widget.setAttribute('require-consent', 'true');
    }

    if (config.showTranscript === false) {
        widget.setAttribute('show-transcript', 'false');
    }

    document.body.appendChild(widget);

    widget.addEventListener('call-start', () => trackEvent('Vapi Call Start', {
        page: window.location.pathname || '/',
        mode: config.mode || 'chat'
    }));

    widget.addEventListener('call-end', () => trackEvent('Vapi Call End', {
        page: window.location.pathname || '/',
        mode: config.mode || 'chat'
    }));

    widget.addEventListener('message', () => trackEvent('Vapi Message', {
        page: window.location.pathname || '/',
        mode: config.mode || 'chat'
    }));

    widget.addEventListener('error', () => trackEvent('Vapi Error', {
        page: window.location.pathname || '/',
        mode: config.mode || 'chat'
    }));
}

async function bootstrapVapiWidget() {
    try {
        await loadScript('/js/vapi-config.js');
    } catch (error) {
        return;
    }

    if (!window.AICLOUD_VAPI_CONFIG || !window.AICLOUD_VAPI_CONFIG.enabled) {
        return;
    }

    try {
        await loadScript('https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js');
        mountVapiWidget(window.AICLOUD_VAPI_CONFIG);
    } catch (error) {
        console.error('Vapi widget failed to load.', error);
    }
}

bootstrapVapiWidget();
