import React from 'react';

const Certificates = () => {
    const certsData = [
        { name: "AI For Everyone", issuer: "Coursera · Andrew Ng", icon: "🧠", delay: "" },
        { name: "Industrial Training in AI/ML", issuer: "Gradvation", icon: "⚙️", delay: "delay-1" },
        { name: "Python for Data Science", issuer: "Great Learning", icon: "📊", delay: "delay-2" },
        { name: "Industry Engagement & Technology Exposure", issuer: "Microsoft", icon: "🏢", delay: "delay-3" },
        { name: "Hackathon Participant", issuer: "Multiple College-Level AI & Automation Events", icon: "🏆", delay: "delay-1" },
        { name: "Model United Nations (MUN)", issuer: "uMUNg · Campus Ambassador · InternWare 2023", icon: "🌐", delay: "delay-2" }
    ];

    return (
        <section className="section" id="certificates">
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-tag">05. Achievements</span>
                    <h2 className="section-title">Credentials & Roles</h2>
                    <div className="section-line"></div>
                </div>

                <div className="certs-grid">
                    {certsData.map((cert, index) => (
                        <div className={`cert-card reveal ${cert.delay}`} key={index}>
                            <div className="cert-icon">{cert.icon}</div>
                            <div className="cert-body">
                                <div className="cert-name">{cert.name}</div>
                                <div className="cert-issuer">{cert.issuer}</div>
                            </div>
                            <div className="cert-glow"></div>
                        </div>
                    ))}
                </div>

                <div className="roles-section reveal">
                    <h3 className="roles-title">🚀 Leadership & Initiative</h3>
                    <div className="roles-grid" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '700px', margin: '0 auto' }}>
                        <ul className="project-desc" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', padding: '1.75rem 2.5rem 1.75rem 3.5rem', boxShadow: 'var(--shadow-card)', width: '100%', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                            <li style={{ marginBottom: '0.8rem' }}><strong>Mentor at InternWare</strong> — guiding peers in technical concepts</li>
                            <li style={{ marginBottom: '0.8rem' }}><strong>Hackathon Participant</strong> — competing in multiple AI & automation events</li>
                            <li style={{ marginBottom: '0.8rem' }}><strong>Built multiple full ML workflows end-to-end</strong> — from data cleaning to deployment</li>
                            <li style={{ marginBottom: 0 }}><strong>Tech President & House Captain</strong> — led technical initiatives at Summer Fields School</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Certificates;
