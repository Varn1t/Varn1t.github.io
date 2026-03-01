import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    const canvasRef = useRef(null);
    const [typedText, setTypedText] = useState('');

    // Typing Effect
    useEffect(() => {
        const roles = ['Machine Learning Engineer', 'Data Scientist', 'AI Developer', 'Problem Solver'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let timeout;

        const type = () => {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                setTypedText(currentRole.substring(0, charIndex - 1));
                charIndex--;
            } else {
                setTypedText(currentRole.substring(0, charIndex + 1));
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before new word
            }

            timeout = setTimeout(type, typeSpeed);
        };

        timeout = setTimeout(type, 1000); // Initial delay
        return () => clearTimeout(timeout);
    }, []);

    // Simple Particle Canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = `rgba(168, 85, 247, ${Math.random() * 0.5})`;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width) this.x = 0;
                else if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                else if (this.y < 0) this.y = canvas.height;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const numParticles = Math.min(100, Math.floor(window.innerWidth / 15));
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle());
            }
        };

        initParticles();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className="hero" id="hero">
            <canvas id="particleCanvas" ref={canvasRef}></canvas>
            <div className="hero-content">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="hero-greeting"
                >
                    <span className="mono">print("Hello, World!")</span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="hero-name"
                >
                    Varnit <span className="text-gradient">Kalra</span>
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="hero-tagline"
                >
                    <span className="static-text">I'm a </span>
                    <span className="typed-text" id="typedText">{typedText}</span>
                    <span className="cursor-blink">|</span>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="hero-desc"
                >
                    Motivated CSE student building intelligent systems — from predictive ML models to AI-powered tools.
                    Turning data into decisions, one model at a time.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="hero-btns"
                >
                    <a href="#projects" className="btn btn-primary">View Projects</a>
                    <a href="#contact" className="btn btn-secondary">Get In Touch</a>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="hero-stats"
                >
                    <div className="stat-item">
                        <span className="stat-number">8.5</span>
                        <span className="stat-label">GPA</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-number">6+</span>
                        <span className="stat-label">Projects</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-number">4+</span>
                        <span className="stat-label">Certifications</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-number">∞</span>
                        <span className="stat-label">Curiosity</span>
                    </div>
                </motion.div>
            </div>
            <div className="scroll-indicator">
                <div className="scroll-mouse">
                    <div className="scroll-wheel"></div>
                </div>
                <span>Scroll to explore</span>
            </div>
        </section>
    );
};

export default Hero;
