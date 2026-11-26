import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// A badge hanging from its strap: a damped pendulum you can grab and fling.
// Brushing the cursor across it nudges it; at rest it keeps a faint idle sway.
const Swing = ({ seed, children }) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
        let angle = 0, vel = 0, dragging = false, start = null, raf;
        const phase = seed * 1.7;

        const pivot = () => {
            const r = el.getBoundingClientRect();
            return { x: r.left + r.width / 2, y: r.top };
        };
        const step = t => {
            if (!dragging) {
                const rest = reduce ? 0 : 2 * Math.sin(t / 900 + phase); // idle sway, degrees
                vel += (-(angle - rest) * 0.045) - vel * 0.06; // spring + damping
                angle += vel;
            }
            el.style.transform = `rotate(${angle.toFixed(2)}deg)`;
            raf = requestAnimationFrame(step);
        };
        const onDown = e => { start = { x: e.clientX, y: e.clientY, id: e.pointerId }; };
        const onMove = e => {
            if (start && !dragging && Math.hypot(e.clientX - start.x, e.clientY - start.y) > 6) {
                dragging = true; // only now, so plain clicks on links still work
                el.setPointerCapture(start.id);
                el.classList.add('swinging');
            }
            if (dragging) {
                const p = pivot();
                const next = Math.max(-70, Math.min(70, (Math.atan2(p.x - e.clientX, e.clientY - p.y) * 180) / Math.PI));
                vel = next - angle;
                angle = next;
            } else if (!start && !reduce) {
                vel += e.movementX * 0.04; // brushing past
            }
        };
        const onUp = () => {
            start = null;
            if (dragging) { dragging = false; el.classList.remove('swinging'); }
        };
        el.addEventListener('pointerdown', onDown);
        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerup', onUp);
        el.addEventListener('pointercancel', onUp);
        raf = requestAnimationFrame(step);
        return () => {
            cancelAnimationFrame(raf);
            el.removeEventListener('pointerdown', onDown);
            el.removeEventListener('pointermove', onMove);
            el.removeEventListener('pointerup', onUp);
            el.removeEventListener('pointercancel', onUp);
        };
    }, [seed]);

    return <div className="swing" ref={ref}>{children}</div>;
};

const Certificates = () => {
    const certsData = [
        { name: "IBM Machine Learning Professional Certificate", issuer: "IBM", icon: <DataIcon />, type: "CERTIFIED", link: "https://coursera.org/share/fc1b168586978d913a5712387030df18" },
        { name: "AWS Cloud Technical Essentials", issuer: "AWS", icon: <CloudIcon />, type: "CERTIFIED", link: "https://coursera.org/share/c5684ec2f6f94f9c7924b497d587ae3a" },
        { name: "GenAI Powered Data Analytics Job Simulation", issuer: "Tata", icon: <BrainIcon />, type: "SIMULATION" },
        { name: "Industrial Training in AI/ML", issuer: "Gradvation", icon: <CogIcon />, type: "TRAINEE" },
        { name: "Python for Data Science", issuer: "Great Learning", icon: <ChartIcon />, type: "CERTIFIED" },
        { name: "Industry Engagement", issuer: "Microsoft", icon: <BuildingIcon />, type: "PARTICIPANT" },
        { name: "Hackathon Participant", issuer: "Multiple AI & Automation Events", icon: <TrophyIcon />, type: "COMPETITOR" },
        { name: "Model United Nations", issuer: "Delegate", icon: <GlobeIcon />, type: "DELEGATE" }
    ];

    const leadershipData = [
        "InternWare — Executive (2023-2024), Mentor (2025 - May 2026), guiding peers in technical concepts",
        "Hackathon Participant — competing in multiple AI & automation events",
        "Built multiple full ML workflows end-to-end — from data cleaning to deployment",
        "Tech President & House Captain — led technical initiatives at Summer Fields School"
    ];

    return (
        <section className="section certificates-section" id="certificates">
            <div className="container">
                <motion.div
                    className="section-header reveal"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">Credentials & Achievements</h2>
                    <div className="section-line"></div>
                </motion.div>

                <div className="lanyard-grid">
                    {certsData.map((cert, index) => {
                        const delay = index * 0.2;

                        return (
                            <motion.div
                                className="lanyard-wrapper"
                                key={index}
                                initial={{ opacity: 0, y: -50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{
                                    opacity: { duration: 0.5, delay },
                                    y: { duration: 0.8, type: "spring", bounce: 0.4, delay }
                                }}
                                whileHover={{ zIndex: 10 }}
                            >
                                <Swing seed={index}>
                                <div className="lanyard-strap"></div>
                                <div className="lanyard-clip"></div>

                                <div className="id-badge">
                                    <div className="badge-hole"></div>
                                    <div className="badge-header">
                                        <span>{cert.type}</span>
                                    </div>
                                    <div className="badge-content">
                                        <div className="cert-icon">{cert.icon}</div>
                                        <h4 className="cert-name">
                                            {cert.link ? (
                                                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-link">
                                                    {cert.name}
                                                </a>
                                            ) : cert.name}
                                        </h4>
                                        <p className="cert-issuer">{cert.issuer}</p>

                                        <div className="badge-footer">
                                            <div className="barcode">|| | ||| || ||| | ||</div>
                                            <span className="badge-id">ID: 00{index + 1}-VK</span>
                                        </div>
                                    </div>
                                    {/* Glass glare effect */}
                                    <div className="badge-glare"></div>
                                </div>
                                </Swing>
                            </motion.div>
                        );
                    })}

                    {/* VIP ALL-ACCESS PASS for Leadership */}
                    <motion.div
                        className="lanyard-wrapper vip-pass"
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                            opacity: { duration: 0.5, delay: 0.8 },
                            y: { duration: 0.8, type: "spring", bounce: 0.4, delay: 0.8 }
                        }}
                        whileHover={{ zIndex: 10 }}
                    >
                        <Swing seed={certsData.length}>
                        <div className="lanyard-strap vip-strap"></div>
                        <div className="lanyard-clip vip-clip"></div>

                        <div className="id-badge vip-badge">
                            <div className="badge-hole"></div>
                            <div className="badge-header vip-header">
                                <span>VIP ALL-ACCESS PASS</span>
                            </div>
                            <div className="badge-content vip-content">
                                <h4 className="cert-name"><RocketIcon /> Leadership & Initiative</h4>
                                <ul className="vip-roles">
                                    {leadershipData.map((role, rIdx) => (
                                        <li key={rIdx}>{role}</li>
                                    ))}
                                </ul>
                                <div className="badge-footer vip-footer">
                                    <div className="barcode">||| || | |||| || ||| | ||</div>
                                    <span className="badge-id">AUTH: ADMIN</span>
                                </div>
                            </div>
                            <div className="badge-glare"></div>
                        </div>
                        </Swing>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

/* ── SVG Icons ── */
const BrainIcon = () => (
    <svg className="cert-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
);
const CogIcon = () => (
    <svg className="cert-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
);
const ChartIcon = () => (
    <svg className="cert-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
);
const BuildingIcon = () => (
    <svg className="cert-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
    </svg>
);
const TrophyIcon = () => (
    <svg className="cert-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
);
const GlobeIcon = () => (
    <svg className="cert-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);
const CloudIcon = () => (
    <svg className="cert-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
);
const DataIcon = () => (
    <svg className="cert-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
);
const RocketIcon = () => (
    <svg className="cert-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem', display: 'inline-block', verticalAlign: 'middle' }}>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
);

export default Certificates;
