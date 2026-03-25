import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`floating-nav ${isScrolled ? 'scrolled' : ''}`} id="navbar">
            <div className="nav-inner">
                <div className="nav-brand">VARNIT KALRA</div>
                <div className={`nav-links-wrap ${isMenuOpen ? 'open' : ''}`}>
                    <a href="#projects" className="nav-link" onClick={() => setIsMenuOpen(false)}>Work</a>
                    <a href="#about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</a>
                    <a href="#skills" className="nav-link" onClick={() => setIsMenuOpen(false)}>Skills</a>
                    <a href="#contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</a>
                    <a href="https://github.com/Varn1t" target="_blank" rel="noreferrer" className="nav-link nav-cta">Resume</a>
                </div>
                <button
                    className={`hamburger ${isMenuOpen ? 'open' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Menu"
                >
                    <span></span><span></span><span></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
