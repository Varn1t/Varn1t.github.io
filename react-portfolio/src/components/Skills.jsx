import React, { useEffect, useRef } from 'react';

const Skills = () => {
    const skillsData = [
        {
            category: "Languages",
            icon: "💻",
            delay: "",
            items: [
                { name: "Python", level: 92 },
                { name: "C / C++", level: 65 },
                { name: "MySQL", level: 70 },
                { name: "Java", level: 40 }
            ]
        },
        {
            category: "ML / AI Tools",
            icon: "🤖",
            delay: "delay-1",
            items: [
                { name: "Scikit-learn", level: 85 },
                { name: "NumPy / Pandas", level: 88 },
                { name: "Matplotlib / Seaborn", level: 82 },
                { name: "YOLOv8 / OpenCV", level: 75 }
            ]
        },
        {
            category: "Web & Platforms",
            icon: "🌐",
            delay: "delay-2",
            items: [
                { name: "HTML / CSS", level: 80 },
                { name: "React", level: 60 },
                { name: "Flask", level: 65 },
                { name: "Botpress", level: 70 },
                { name: "JavaScript", level: 72 }
            ]
        }
    ];

    const devEnvironment = [
        "Jupyter Notebook", "Google Colab", "VS Code", "Git / GitHub",
        "Android Studio", "Canva", "MS Office", "Lua"
    ];

    const sectionRef = useRef(null);

    // Intersection Observer for animated skill bars
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const fills = entry.target.querySelectorAll('.skill-fill');
                        fills.forEach(fill => {
                            const width = fill.getAttribute('data-width');
                            fill.style.width = `${width}%`;
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="section" id="skills" ref={sectionRef}>
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-tag">03. Skills</span>
                    <h2 className="section-title">My Arsenal</h2>
                    <div className="section-line"></div>
                </div>

                <div className="skills-grid">
                    {skillsData.map((group, index) => (
                        <div className={`skill-category reveal ${group.delay}`} key={index}>
                            <h3 className="skill-cat-title"><span className="skill-icon">{group.icon}</span> {group.category}</h3>
                            <div className="skill-bars">
                                {group.items.map((skill, sIdx) => (
                                    <div className="skill-bar-item" data-level={skill.level} key={sIdx}>
                                        <div className="skill-name">{skill.name}</div>
                                        <div className="skill-track">
                                            {/* Note: In React, we initialize width at 0 and let CSS/Observer handle the filling */}
                                            <div className="skill-fill" data-width={skill.level} style={{ width: 0 }}></div>
                                        </div>
                                        <div className="skill-pct">{skill.level}%</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="skill-category reveal delay-3">
                        <h3 className="skill-cat-title"><span className="skill-icon">🛠️</span> Dev Environment</h3>
                        <div className="skill-tags-grid">
                            {devEnvironment.map((tool, idx) => (
                                <span className="stag" key={idx}>{tool}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
