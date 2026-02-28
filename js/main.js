/* ═══════════════════════════════════════════════════════════
   VARNIT KALRA PORTFOLIO — Main JavaScript
   Particle Canvas · Typing Effect · Scroll Reveal · Skill Bars
═══════════════════════════════════════════════════════════ */

/* ════════════════════════════
   PARTICLE CANVAS
════════════════════════════ */
(function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, particles = [], animId;

    const CONFIG = {
        count: 80,
        maxSpeed: 0.4,
        minRadius: 1.5,
        maxRadius: 3.5,
        connectDist: 130,
        colors: ['rgba(168,85,247,', 'rgba(129,140,248,', 'rgba(192,132,252,', 'rgba(244,114,182,'],
    };

    function resize() {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }

    class Particle {
        constructor() { this.reset(true); }
        reset(init) {
            this.x = Math.random() * W;
            this.y = init ? Math.random() * H : Math.random() < 0.5 ? -10 : H + 10;
            this.vx = (Math.random() - 0.5) * CONFIG.maxSpeed;
            this.vy = (Math.random() - 0.5) * CONFIG.maxSpeed;
            this.r = CONFIG.minRadius + Math.random() * (CONFIG.maxRadius - CONFIG.minRadius);
            this.alpha = 0.3 + Math.random() * 0.5;
            this.color = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
            this.pulse = Math.random() * Math.PI * 2;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.pulse += 0.02;
            const pulsedAlpha = this.alpha + Math.sin(this.pulse) * 0.1;
            if (this.x < -20 || this.x > W + 20 || this.y < -20 || this.y > H + 20) {
                this.reset(false);
            }
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = this.color + Math.max(0, Math.min(1, pulsedAlpha)) + ')';
            ctx.fill();
        }
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONFIG.connectDist) {
                    const alpha = (1 - dist / CONFIG.connectDist) * 0.25;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(168,85,247,${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, W, H);
        drawConnections();
        particles.forEach(p => p.update());
        animId = requestAnimationFrame(animate);
    }

    function init() {
        resize();
        particles = Array.from({ length: CONFIG.count }, () => new Particle());
        if (animId) cancelAnimationFrame(animId);
        animate();
    }

    window.addEventListener('resize', () => { resize(); init(); });
    init();
})();


/* ════════════════════════════
   TYPING EFFECT
════════════════════════════ */
(function initTyping() {
    const el = document.getElementById('typedText');
    if (!el) return;

    const words = ['Data Scientist', 'ML Engineer', 'AI Explorer', 'Problem Solver', 'Python Developer'];
    let wordIndex = 0, charIndex = 0, deleting = false;

    function type() {
        const word = words[wordIndex];
        if (!deleting) {
            el.textContent = word.slice(0, charIndex + 1);
            charIndex++;
            if (charIndex === word.length) {
                deleting = true;
                setTimeout(type, 1800);
                return;
            }
        } else {
            el.textContent = word.slice(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }
        setTimeout(type, deleting ? 60 : 100);
    }

    setTimeout(type, 600);
})();


/* ════════════════════════════
   SCROLL REVEAL (IntersectionObserver)
════════════════════════════ */
(function initReveal() {
    // Immediately show hero elements
    document.querySelectorAll('.hero .reveal-fade').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 150);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();


/* ════════════════════════════
   SKILL BAR ANIMATION
════════════════════════════ */
(function initSkillBars() {
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.skill-fill').forEach(fill => {
                    const width = fill.getAttribute('data-width');
                    fill.style.width = width + '%';
                });
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-category').forEach(cat => barObserver.observe(cat));
})();


/* ════════════════════════════
   NAVBAR — scroll + active state
════════════════════════════ */
(function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        // Scrolled class
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlight
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) current = section.id;
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    });

    // Hamburger
    const hamburger = document.getElementById('hamburger');
    const linksMenu = document.getElementById('navLinks');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            linksMenu.classList.toggle('open');
        });
        // Close on link click
        linksMenu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => linksMenu.classList.remove('open'));
        });
    }
})();


/* ════════════════════════════
   SMOOTH SCROLL
════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


/* ════════════════════════════
   MOUSE GLOW (subtle parallax glow around cursor in hero)
════════════════════════════ */
(function initMouseGlow() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    let glowEl = document.createElement('div');
    glowEl.style.cssText = `
    position: absolute; pointer-events: none; z-index: 1;
    width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
  `;
    hero.appendChild(glowEl);

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        glowEl.style.left = (e.clientX - rect.left) + 'px';
        glowEl.style.top = (e.clientY - rect.top) + 'px';
    });
})();
