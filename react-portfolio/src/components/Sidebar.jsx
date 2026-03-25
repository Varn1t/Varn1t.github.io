import React, { useState, useEffect } from 'react';

const Sidebar = () => {
    const [activeSection, setActiveSection] = useState('hero');
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const navItems = [
        { id: 'hero', label: 'Home', icon: <HomeIcon /> },
        { id: 'about', label: 'About', icon: <UserIcon /> },
        { id: 'education', label: 'Education', icon: <GradCapIcon /> },
        { id: 'skills', label: 'Skills', icon: <CodeIcon /> },
        { id: 'projects', label: 'Projects', icon: <FolderIcon /> },
        { id: 'certificates', label: 'Certs', icon: <AwardIcon /> },
        { id: 'contact', label: 'Contact', icon: <MailIcon /> },
    ];

    useEffect(() => {
        const sectionIds = navItems.map(item => item.id);
        const observers = [];

        sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(id);
                    }
                },
                { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
            );

            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach(o => o.disconnect());
    }, []);

    const handleNavClick = (e, id) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileOpen(false);
    };

    return (
        <>
            {/* Mobile hamburger */}
            <button
                className={`sidebar-toggle ${isMobileOpen ? 'open' : ''}`}
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label="Toggle navigation"
            >
                <span></span><span></span><span></span>
            </button>

            {/* Overlay */}
            {isMobileOpen && (
                <div className="sidebar-overlay" onClick={() => setIsMobileOpen(false)} />
            )}

            <aside className={`sidebar ${isMobileOpen ? 'open' : ''}`} id="sidebar">
                <div className="sidebar-logo">
                    <span className="logo-bracket">&lt;</span>
                    <span className="logo-text">VK</span>
                    <span className="logo-bracket">/&gt;</span>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map(item => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`sidebar-link ${activeSection === item.id ? 'active' : ''}`}
                            onClick={(e) => handleNavClick(e, item.id)}
                            title={item.label}
                        >
                            <span className="sidebar-icon">{item.icon}</span>
                            <span className="sidebar-label">{item.label}</span>
                        </a>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <a href="https://github.com/Varn1t" target="_blank" rel="noreferrer" className="sidebar-social" aria-label="GitHub">
                        <GithubIcon />
                    </a>
                    <a href="https://in.linkedin.com/in/varnit-kalra" target="_blank" rel="noreferrer" className="sidebar-social" aria-label="LinkedIn">
                        <LinkedInIcon />
                    </a>
                    <a href="mailto:Varnit.contact@gmail.com" className="sidebar-social" aria-label="Email">
                        <MailIcon />
                    </a>
                </div>
            </aside>
        </>
    );
};

/* ── SVG Icon Components ── */

const HomeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

const UserIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const GradCapIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
);

const CodeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
    </svg>
);

const FolderIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
);

const AwardIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
);

const MailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

const GithubIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

export default Sidebar;
