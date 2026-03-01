import React, { useState, useEffect } from 'react';

const Navbar = ({ isDarkMode, toggleTheme }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
            <div className="nav-brand">
                <span className="brand-bracket">&lt;</span>VK<span className="brand-bracket">/&gt;</span>
            </div>

            <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="navLinks">
                <li><a href="#about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</a></li>
                <li><a href="#education" className="nav-link" onClick={() => setIsMenuOpen(false)}>Education</a></li>
                <li><a href="#skills" className="nav-link" onClick={() => setIsMenuOpen(false)}>Skills</a></li>
                <li><a href="#projects" className="nav-link" onClick={() => setIsMenuOpen(false)}>Projects</a></li>
                <li><a href="#certificates" className="nav-link" onClick={() => setIsMenuOpen(false)}>Certs</a></li>
                <li><a href="#contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
                <li>
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle Theme"
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                            padding: '0.4rem',
                            marginLeft: '0.5rem'
                        }}
                    >
                        {isDarkMode ? '☀️' : '🌙'}
                    </button>
                </li>
            </ul>

            <button
                className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                id="hamburger"
                aria-label="Menu"
                onClick={toggleMenu}
            >
                <span></span><span></span><span></span>
            </button>
        </nav>
    );
};

export default Navbar;
