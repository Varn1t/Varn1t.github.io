import React from 'react';

const Projects = () => {
    const projectsData = [
        {
            title: "Smart Traffic Management System (Flask Deployed Web App)",
            featured: true,
            badge: "🔥 Flagship",
            icon: "🚦",
            delay: "",
            link: "https://github.com/Varn1t/traffic-intelligence",
            linkIcon: "github",
            points: [
                "Built ML-based traffic density prediction system",
                "Integrated model into Flask backend",
                "Designed web interface for real-time prediction"
            ],
            tools: ["Python", "YOLOv8", "Flask", "OpenCV", "Matplotlib"]
        },
        {
            title: "AI-Powered Learning Assistant",
            featured: false,
            icon: "🤖",
            delay: "delay-1",
            link: "https://github.com/Varn1t",
            linkIcon: "github",
            points: [
                "Engineered an intelligent chatbot to handle FAQs and build study timetables",
                "Integrated custom APIs to generate personalized quizzes",
                "Automated learning resource recommendations using Botpress"
            ],
            tools: ["Python", "Botpress", "APIs"]
        },
        {
            title: "House Price Prediction",
            featured: false,
            icon: "🏠",
            delay: "delay-2",
            link: "https://colab.research.google.com",
            linkIcon: "colab",
            points: [
                "Built a regression-based ML pipeline with feature engineering",
                "Achieved optimized R² performance using OneHotEncoding",
                "Implemented robust model persistence using Pickle"
            ],
            tools: ["Python", "Scikit-learn", "Pickle", "Regression"]
        },
        {
            title: "Car Price Prediction (End-to-End ML + Flask Deployment)",
            featured: false,
            icon: "🚗",
            delay: "delay-1",
            link: "https://github.com/Varn1t/Car-Price-Predictor",
            linkIcon: "github",
            points: [
                "Data preprocessing pipeline using OneHotEncoder",
                "Trained regression model with optimized R²",
                "Deployed using Flask for live user input predictions"
            ],
            tools: ["Python", "Scikit-learn", "Flask", "Pickle", "Regression"]
        },
        {
            title: "DDoS Detection System",
            featured: false,
            badge: "🔧 In Progress",
            wip: true,
            icon: "🛡️",
            delay: "delay-2",
            link: "https://github.com/Varn1t",
            linkIcon: "github",
            points: [
                "Developed a Python-based tool to detect and mitigate DDoS attacks",
                "Analyzed packet behavior to identify malicious network traffic",
                "Merged cybersecurity concepts with ML classification models for real-time threat identification"
            ],
            tools: ["Python", "ML Classification", "Cybersecurity"]
        },
        {
            title: "Criminal Record DBMS",
            featured: false,
            icon: "🗄️",
            delay: "delay-3",
            link: "https://github.com/Varn1t",
            linkIcon: "github",
            points: [
                "Designed a comprehensive database management system using MySQL",
                "Integrated Python backend to manage, query, and analyze criminal records",
                "Built an intuitive interface tailored for law enforcement data operations"
            ],
            tools: ["Python", "MySQL"]
        }
    ];

    const GithubIcon = () => (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
    );

    const ColabIcon = () => (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.9 4.8C13.7 1.8 8.9 1.9 5.8 5.1 2.7 8.3 2.8 13.2 6 16.2s8 2.9 11.1-.3c1.5-1.5 2.2-3.5 2.2-5.5h-7.4v2.8h4.3c-.6 2.1-2.5 3.6-4.8 3.6-2.9 0-5.2-2.3-5.2-5.2s2.3-5.2 5.2-5.2c1.3 0 2.5.5 3.4 1.3l2.1-2.1z" />
        </svg>
    );

    return (
        <section className="section section-dark" id="projects">
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-tag">04. Projects</span>
                    <h2 className="section-title">What I've Built</h2>
                    <div className="section-line"></div>
                </div>
                <div className="projects-grid">
                    {projectsData.map((project, index) => (
                        <div
                            className={`project-card ${project.featured ? 'featured' : ''} ${project.wip ? 'in-progress' : ''} reveal ${project.delay}`}
                            key={index}
                        >
                            {project.badge && <div className={`project-badge ${project.wip ? 'wip' : ''}`}>{project.badge}</div>}

                            <div className="project-header">
                                <div className="project-icon">{project.icon}</div>
                                <div className="project-links">
                                    <a href={project.link} target="_blank" rel="noreferrer" className={`proj-link ${project.linkIcon === 'colab' ? 'colab-link' : ''}`} aria-label={project.linkIcon === 'colab' ? 'Colab' : 'GitHub'}>
                                        {project.linkIcon === 'github' ? <GithubIcon /> : <ColabIcon />}
                                    </a>
                                </div>
                            </div>

                            <h3 className="project-title">{project.title}</h3>

                            <ul className="project-desc" style={{ paddingLeft: '1.25rem', flex: 1, marginBottom: '1.25rem' }}>
                                {project.points.map((point, pIndex) => (
                                    <li key={pIndex} style={{ marginBottom: pIndex === project.points.length - 1 ? '0' : '0.3rem' }}>
                                        {point}
                                    </li>
                                ))}
                            </ul>

                            <div className="project-tools">
                                {project.tools.map((tool, tIndex) => (
                                    <span className="tool-tag" key={tIndex}>{tool}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
