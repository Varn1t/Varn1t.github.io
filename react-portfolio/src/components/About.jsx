import React from 'react';

const About = () => {
    return (
        <section className="section" id="about">
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-tag">01. About Me</span>
                    <h2 className="section-title">Who I Am</h2>
                    <div className="section-line"></div>
                </div>
                <div className="about-content">
                    <div className="about-text reveal">
                        <p className="about-lead">
                            I'm a <strong>Computer Science Engineering student</strong> at the Institute of Information
                            Technology & Management, Janakpuri — passionate about building intelligent systems that solve
                            real-world problems.
                        </p>
                        <p>
                            My journey spans <span className="highlight">Data Science</span>, <span className="highlight">Machine
                                Learning</span>, and <span className="highlight">AI development</span>. I've built everything
                            from YOLO-based traffic management systems to regression models and chatbots — always chasing
                            the intersection of data and impact.
                        </p>
                        <p>
                            Beyond code, I serve as a <strong>Mentor at InternWare</strong>, have represented institutions
                            as a <strong>MUN delegate</strong>, and led as <strong>Tech President</strong> at Summer Fields
                            School. I believe great engineers are also great communicators.
                        </p>
                        <div className="about-tags">
                            <span className="tag">🧠 Problem Solver</span>
                            <span className="tag">📊 Data-Driven</span>
                            <span className="tag">🤖 AI Enthusiast</span>
                            <span className="tag">🚀 Fast Learner</span>
                            <span className="tag">🤝 Team Player</span>
                        </div>
                    </div>
                    <div className="about-card-grid reveal delay-1">
                        <div className="info-card">
                            <div className="info-icon">🎓</div>
                            <div className="info-label">Institution</div>
                            <div className="info-value">IITM, Janakpuri</div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">📅</div>
                            <div className="info-label">Graduating</div>
                            <div className="info-value">August 2027</div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">📍</div>
                            <div className="info-label">Location</div>
                            <div className="info-value">India</div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">✉️</div>
                            <div className="info-label">Email</div>
                            <div className="info-value"><a href="mailto:Varnit.contact@gmail.com">Varnit.contact@gmail.com</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
