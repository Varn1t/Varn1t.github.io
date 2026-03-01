import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <span className="brand-bracket">&lt;</span>VK<span className="brand-bracket">/&gt;</span>
                    </div>
                    <p className="footer-text">Built with ❤️ · © 2026 Varnit </p>
                    <div className="footer-links">
                        <a href="mailto:Varnit.contact@gmail.com">Email</a>
                        <a href="https://github.com/Varn1t" target="_blank" rel="noreferrer">GitHub</a>
                        <a href="https://in.linkedin.com/in/varnit-kalra" target="_blank" rel="noreferrer">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
