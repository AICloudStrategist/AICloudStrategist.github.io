// AICloud Strategist Chatbot
(function() {
    const toggle = document.getElementById('chatbotToggle');
    const window_ = document.getElementById('chatbotWindow');
    const closeBtn = document.getElementById('chatbotClose');
    const messages = document.getElementById('chatbotMessages');
    const leadForm = document.getElementById('chatbotLeadForm');
    const leadSubmit = document.getElementById('chatLeadSubmit');
    const chatInputArea = document.getElementById('chatbotInput');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');

    // Lead storage
    const leads = [];
    let currentLead = null;

    // Toggle chatbot
    toggle.addEventListener('click', () => {
        window_.classList.toggle('open');
    });

    closeBtn.addEventListener('click', () => {
        window_.classList.remove('open');
    });

    // Lead form submission
    leadSubmit.addEventListener('click', () => {
        const name = document.getElementById('chatLeadName').value.trim();
        const email = document.getElementById('chatLeadEmail').value.trim();
        const phone = document.getElementById('chatLeadPhone').value.trim();

        if (!name || !email) {
            addMessage('bot', 'Please provide at least your name and email to continue.');
            return;
        }

        if (!isValidEmail(email)) {
            addMessage('bot', 'Please enter a valid email address.');
            return;
        }

        currentLead = {
            name: name,
            email: email,
            phone: phone || 'Not provided',
            timestamp: new Date().toISOString(),
            conversation: []
        };
        leads.push(currentLead);

        // Save to localStorage
        saveLead(currentLead);

        // Send lead to Formspree as well
        submitLeadToFormspree(currentLead);

        // Hide lead form, show chat input
        leadForm.style.display = 'none';
        chatInputArea.style.display = 'flex';

        addMessage('bot', `Thanks ${name}! How can I help you today? You can ask about our services, pricing, or anything else.`);
    });

    // Chat send
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage('user', text);
        chatInput.value = '';

        if (currentLead) {
            currentLead.conversation.push({ role: 'user', text: text, time: new Date().toISOString() });
            saveLead(currentLead);
        }

        // Generate response
        setTimeout(() => {
            const response = generateResponse(text);
            addMessage('bot', response);
            if (currentLead) {
                currentLead.conversation.push({ role: 'bot', text: response, time: new Date().toISOString() });
                saveLead(currentLead);
            }
        }, 600);
    }

    function addMessage(role, text) {
        const div = document.createElement('div');
        div.className = `chat-msg ${role}`;
        div.innerHTML = `<p>${text}</p>`;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function generateResponse(input) {
        const lower = input.toLowerCase();

        // Services
        if (lower.includes('service') || lower.includes('what do you do') || lower.includes('offer')) {
            return 'We offer 6 core services:<br>1. AI & Cloud Architecture Review<br>2. Cloud Cost Optimization & FinOps<br>3. Observability<br>4. DevOps<br>5. Cloud Security<br>6. Cloud Transformation Consulting<br><br>Which service interests you most?';
        }

        // Architecture
        if (lower.includes('architect') || lower.includes('review') || lower.includes('assessment')) {
            return 'Our <strong>AI & Cloud Architecture Review</strong> includes a deep-dive assessment of your cloud infrastructure, Well-Architected Framework review, AI/ML infrastructure design, and multi-cloud strategy recommendations. Want to schedule a free assessment?';
        }

        // FinOps / Cost
        if (lower.includes('cost') || lower.includes('finops') || lower.includes('saving') || lower.includes('expensive') || lower.includes('bill') || lower.includes('pricing') || lower.includes('price')) {
            return 'Our <strong>FinOps & Cloud Cost Optimization</strong> service helps reduce cloud spending by up to 40%. We implement cost dashboards, rightsizing, reserved instance strategies, and budget attribution. For our consulting pricing, we offer flexible engagement models. Want to discuss your specific needs?';
        }

        // Observability
        if (lower.includes('observ') || lower.includes('monitor') || lower.includes('alert') || lower.includes('log')) {
            return 'Our <strong>Observability</strong> practice covers monitoring & alerting, distributed tracing, log aggregation, and custom dashboards with SLOs. We work with tools like Datadog, Prometheus, Grafana, and more. Interested in an observability assessment?';
        }

        // DevOps
        if (lower.includes('devops') || lower.includes('ci/cd') || lower.includes('pipeline') || lower.includes('deploy') || lower.includes('kubernetes') || lower.includes('k8s')) {
            return 'Our <strong>DevOps</strong> services include CI/CD pipeline design, Infrastructure as Code, platform engineering, GitOps, and Kubernetes orchestration. We accelerate your software delivery while maintaining reliability. Shall I arrange a consultation?';
        }

        // Security
        if (lower.includes('secur') || lower.includes('compliance') || lower.includes('vulnerab') || lower.includes('zero trust') || lower.includes('soc2') || lower.includes('iso')) {
            return 'Our <strong>Cloud Security</strong> offering includes zero-trust implementation, compliance automation (SOC2, ISO 27001), vulnerability management, and DevSecOps integration. We protect your cloud workloads end-to-end. Want to schedule a security audit?';
        }

        // Cloud Transformation / Migration
        if (lower.includes('migrat') || lower.includes('transform') || lower.includes('modern') || lower.includes('legacy') || lower.includes('cloud native')) {
            return 'Our <strong>Cloud Transformation Consulting</strong> guides you from legacy systems to cloud-native architectures. We handle migration strategy, application modernization, hybrid/multi-cloud design, and refactoring — with minimal disruption. Ready to start your transformation?';
        }

        // AWS / Azure / GCP
        if (lower.includes('aws') || lower.includes('azure') || lower.includes('gcp') || lower.includes('google cloud') || lower.includes('cloud platform')) {
            return 'We have deep expertise across <strong>AWS, Microsoft Azure, and Google Cloud</strong>. Our certified architects can help with any cloud platform — including multi-cloud and hybrid strategies. Which platform are you currently using?';
        }

        // Location
        if (lower.includes('where') || lower.includes('location') || lower.includes('office') || lower.includes('address')) {
            return 'Our office is at <strong>Noida City Center, Noida, Uttar Pradesh - 201306, India</strong>. We serve clients globally. You can reach us at contact@aicloudstretegist.com or call 1-800-AICLOUD (1-800-242-5683).';
        }

        // Contact
        if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('call') || lower.includes('reach')) {
            return 'You can reach us at:<br><strong>Email:</strong> contact@aicloudstretegist.com<br><strong>Phone:</strong> 1-800-AICLOUD (1-800-242-5683)<br><strong>Office:</strong> Noida City Center, Noida UP 201306, India<br><br>Or fill out the contact form on this page!';
        }

        // Consultation
        if (lower.includes('consult') || lower.includes('meeting') || lower.includes('schedule') || lower.includes('book') || lower.includes('demo')) {
            return 'We offer a <strong>free initial consultation</strong>! You can book one by filling out the contact form on this page, emailing us at contact@aicloudstretegist.com, or calling 1-800-AICLOUD. We typically respond within 24 hours.';
        }

        // Greeting
        if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('good morning') || lower.includes('good evening')) {
            return `Hello! Welcome to AICloud Strategist. I'm here to help with any questions about our cloud consulting services. What would you like to know?`;
        }

        // Thanks
        if (lower.includes('thank') || lower.includes('thanks') || lower.includes('appreciate')) {
            return 'You\'re welcome! Is there anything else I can help you with? Feel free to ask about our services or schedule a consultation.';
        }

        // Default
        return 'Thanks for your question! For detailed information, I\'d recommend speaking with one of our cloud architects. You can:<br>- Fill out the <a href="#contact" style="color: #00D4AA;">contact form</a> below<br>- Email us at contact@aicloudstretegist.com<br>- Call 1-800-AICLOUD<br><br>Is there anything specific about our services I can help with?';
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function saveLead(lead) {
        try {
            const existing = JSON.parse(localStorage.getItem('aicloud_leads') || '[]');
            const idx = existing.findIndex(l => l.email === lead.email && l.timestamp === lead.timestamp);
            if (idx >= 0) {
                existing[idx] = lead;
            } else {
                existing.push(lead);
            }
            localStorage.setItem('aicloud_leads', JSON.stringify(existing));
        } catch (e) {
            // localStorage may not be available
        }
    }

    function submitLeadToFormspree(lead) {
        fetch('https://formspree.io/f/mjgpjpbe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                name: lead.name,
                email: lead.email,
                phone: lead.phone,
                _subject: 'New Chatbot Lead - AICloud Strategist',
                message: `New chatbot lead captured:\nName: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nTime: ${lead.timestamp}`
            })
        }).catch(() => {
            // Silently fail - lead is still saved in localStorage
        });
    }
})();
