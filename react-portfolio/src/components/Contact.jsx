import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus(null), 5000);
        }, 1500);
    };

    return (
        <section className="section section-dark" id="contact">
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-tag">06. Contact</span>
                    <h2 className="section-title">Let's Connect</h2>
                    <div className="section-line"></div>
                </div>
                <div className="contact-content reveal">
                    <div className="contact-info-panel">
                        <p className="contact-lead">I'm always open to exciting opportunities, collaborations, or just a great
                            conversation about AI and data. Reach out — let's build something amazing.</p>
                        <div className="contact-links">
                            <a href="mailto:Varnit.contact@gmail.com" className="contact-card" id="contact-email">
                                <div className="contact-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                </div>
                                <div className="contact-info">
                                    <div className="contact-label">Email</div>
                                    <div className="contact-value">Varnit.contact@gmail.com</div>
                                </div>
                            </a>
                            <a href="https://github.com/Varn1t" target="_blank" rel="noreferrer" className="contact-card" id="contact-github">
                                <div className="contact-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path
                                            d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                                    </svg>
                                </div>
                                <div className="contact-info">
                                    <div className="contact-label">GitHub</div>
                                    <div className="contact-value">github.com/Varn1t</div>
                                </div>
                            </a>
                            <a href="https://in.linkedin.com/in/varnit-kalra" target="_blank" rel="noreferrer" className="contact-card"
                                id="contact-linkedin">
                                <div className="contact-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path
                                            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </div>
                                <div className="contact-info">
                                    <div className="contact-label">LinkedIn</div>
                                    <div className="contact-value">in.linkedin.com/in/varnit-kalra</div>
                                </div>
                            </a>
                        </div>
                    </div>

                    <motion.form
                        className="contact-form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-input"
                                placeholder="John Doe"
                                required
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-input"
                                placeholder="john@example.com"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                className="form-textarea"
                                placeholder="Hello Varnit, I'd like to talk about..."
                                required
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ border: 'none' }}>
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                        {status === 'success' && (
                            <p style={{ color: 'var(--accent)', fontSize: '0.9rem', textAlign: 'center', marginTop: '1rem' }}>
                                Message sent successfully!
                            </p>
                        )}
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
