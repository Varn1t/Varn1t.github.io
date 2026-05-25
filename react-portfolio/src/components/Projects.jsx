import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
    const [activeProject, setActiveProject] = useState(0);
    const [isBooting, setIsBooting] = useState(false);

    const projectsData = [
        {
            title: "TraffiQ",
            featured: true,
            link: "https://github.com/Varn1t/TraffiQ",
            linkIcon: "github",
            points: [
                "Tracked 4 vehicle classes with 92%+ accuracy across 5,000+ data points per session",
                "Predicted lane-specific demand 15s in advance (R² = 0.89); flagged bottlenecks 15–30s early, improving signal timing efficiency by 25%",
                "Added a two-way control panel with collapsible sidebar, including live sliders for YOLO confidence (0.10–0.95), speed threshold (20–120 km/h), and incident timeout (2–30s)",
                "Implemented visualization mode toggles (Lanes, Heatmap, Speed, Timer) with 5-second cooldown protection"
            ],
            tools: ["Python", "YOLOv8", "Flask", "OpenCV", "Chart.js", "ML"]
        },
        {
            title: "LoreLoop",
            featured: true,
            link: "https://github.com/Varn1t/LoreLoop",
            linkIcon: "github",
            points: [
                "Extended local RAG pipeline to support PDF and YouTube ingestion, completely private with zero API costs",
                "Integrated a complete control panel sidebar with live sliders for chunk size (200–2,000 chars), overlap (0–300 chars), and top-K retrieved chunks (1–5)",
                "Separates data ingestion and config from the clean main chat view, eliminating hardcoded defaults",
                "Offers dual interfaces: a Streamlit web app and an interactive CLI — both powered by local Ollama Llama 3"
            ],
            tools: ["Python", "LangChain", "FAISS", "Ollama", "Streamlit", "Llama 3", "YouTube Transcript API"]
        },
        {
            title: "EDAgent: Your data analyst+AI agent",
            featured: true,
            link: "https://github.com/Varn1t/EDAgent/tree/main",
            linkIcon: "github",
            points: [
                "Built a modular agentic data-science assistant using LangGraph (StateGraph) to automate exploratory data analysis (EDA) pipelines, reducing manual processing cycles by 80%",
                "Processed complex datasets of 100,000+ rows through self-correcting validation loops, ensuring dataset schema integrity and highly reliable code generation",
                "Generated comprehensive, interactive HTML reports featuring 15+ rich visualizations, diagnostic tests, and automated narrative summaries from LLM analysts",
                "Designed a sleek, responsive Streamlit dashboard with real-time agent execution telemetry, stage trackers, and granular parameter controllers"
            ],
            tools: ["Python", "Streamlit", "LangGraph", "Data Analysis"]
        },
        {
            title: "SkyFlow-MLOps",
            featured: true,
            link: "https://github.com/Varn1t/SkyFlow-MLOps",
            linkIcon: "github",
            points: [
                "Architected a fully containerized end-to-end MLOps pipeline orchestrating historical weather data ingestion, preprocessing, model training, and lifecycle registry",
                "Orchestrated daily pipelines with Apache Airflow to ingest 17,000+ hourly weather records via keyless Open-Meteo API and trigger Docker microservices",
                "Logged experiments, parameters, and models dynamically using MLflow, persisting runs to a SQLite db mapping mapped between local dev and containers",
                "Developed an AI-powered validation agent using local Ollama (Llama 3) to analyze training metric anomalies and provide reasoned deployment verdicts"
            ],
            tools: ["Apache Airflow", "MLflow", "Docker", "Ollama", "Scikit-Learn", "Python", "MLOps"]
        },
        {
            title: "Student Performance EDA",
            featured: false,
            link: "https://github.com/Varn1t",
            linkIcon: "colab",
            points: [
                "End-to-end EDA on 1,000-student dataset; applied binary, ordinal, and one-hot encoding",
                "Discovered a 10–11 point math score gap by lunch type (socio-economic proxy) and validated test prep impact (t = 5.70, p < 0.001) via hypothesis testing",
                "Proposed multiple linear regression as next step targeting RMSE-based evaluation"
            ],
            tools: ["Python", "Pandas", "Matplotlib", "Seaborn"]
        },
        {
            title: "Car Price Prediction",
            featured: false,
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
            title: "House Price Prediction",
            featured: false,
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
            title: "Crime Record Management",
            featured: false,
            link: "https://github.com/Varn1t/Criminal-Record",
            linkIcon: "github",
            points: [
                "Designed a sleek, interactive Command-Line Interface (CLI) application using the 'rich' library",
                "Migrated the database backend to PostgreSQL for full CRUD operations and robust search functionality",
                "Implemented an Analytics Dashboard that dynamically calculates records, categories, and frequent offences"
            ],
            tools: ["Python", "PostgreSQL", "Rich", "psycopg2"]
        }
    ];

    const floppyColors = [
        '#1f2937', // Dark Gray
        '#1e3a8a', // Deep Blue
        '#4c1d95', // Purple
        '#831843', // Burgundy
        '#14532d', // Forest Green
        '#7c2d12', // Rust
        '#0f4c5c'  // Teal
    ];

    const handleDiskClick = (index) => {
        if (activeProject === index || isBooting) return;
        setIsBooting(true);
        setActiveProject(index);

        // Boot sequence timeout (1.5 seconds)
        setTimeout(() => {
            setIsBooting(false);
        }, 1500);
    };

    return (
        <section className="section projects-section" id="projects">
            <div className="container">
                <motion.div
                    className="section-header reveal"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">Projects</h2>
                    <div className="section-line"></div>
                </motion.div>

                <div className="projects-desktop">

                    {/* LEFT: Floppy Disks Grid */}
                    <div className="floppy-desk-grid">
                        {projectsData.map((project, index) => {
                            const isInserted = activeProject === index;

                            return (
                                <motion.div
                                    key={index}
                                    className={`floppy-disk ${isInserted ? 'inserted' : ''}`}
                                    onClick={() => handleDiskClick(index)}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    animate={isInserted ? {
                                        scale: 0.95,
                                        y: -5,
                                        boxShadow: "0 20px 40px rgba(0,0,0,0.8)"
                                    } : {
                                        scale: 1,
                                        y: 0,
                                        boxShadow: "0 10px 15px rgba(0,0,0,0.5)"
                                    }}
                                    whileHover={!isInserted ? { scale: 1.05, y: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.6)" } : {}}
                                    transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
                                >
                                    <div className="floppy-plastic" style={{ backgroundColor: floppyColors[index % floppyColors.length] }}>
                                        <div className="floppy-shutter">
                                            <div className="shutter-door"></div>
                                        </div>
                                        <div className="floppy-arrow"></div>
                                        <div className="floppy-label-area">
                                            <div className="floppy-label-paper">
                                                <div className="label-stripe" style={{ backgroundColor: floppyColors[(index + 1) % floppyColors.length] }}></div>
                                                <span className="label-text">{project.title.split(' ').slice(0, 3).join(' ')}</span>
                                            </div>
                                        </div>
                                        <div className="floppy-notch"></div>

                                        {/* Active indicator overlay */}
                                        {isInserted && (
                                            <div className="active-disk-indicator">
                                                <div className="indicator-light"></div>
                                                <span>IN DRIVE</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* RIGHT: CRT Terminal & Drive */}
                    <div className="crt-terminal-wrapper">

                        <div className="floppy-drive">
                            <div className="drive-slot"></div>
                            <div className={`drive-light ${isBooting ? 'reading' : 'idle'}`}></div>
                        </div>

                        <div className="crt-monitor">
                            <div className="crt-glass">
                                <div className="scanlines"></div>
                                <div className="crt-content">
                                    {isBooting ? (
                                        <div className="boot-sequence">
                                            <p className="boot-1">{`> MOUNTING DISK...`}</p>
                                            <p className="boot-2">{`> READING SECTORS... [OK]`}</p>
                                            <p className="boot-3">{`> DECRYPTING PROJECT DATA...`}</p>
                                            <p className="boot-4 blink">_</p>
                                        </div>
                                    ) : (
                                        <motion.div
                                            className="project-data"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.1 }} // Instant CRT pop-in
                                        >
                                            <div className="terminal-header">
                                                <span>A:\&gt; RUN {projectsData[activeProject].title.toUpperCase().replace(/\s+/g, '_').substring(0, 10)}.EXE</span>
                                            </div>

                                            <h3 className="term-title">
                                                {projectsData[activeProject].title}
                                            </h3>

                                            <div className="term-points">
                                                {projectsData[activeProject].points.map((pt, i) => (
                                                    <p key={i}>{`* ${pt}`}</p>
                                                ))}
                                            </div>

                                            <div className="term-tools">
                                                <p>{`> SYSTEM DEPENDENCIES:`}</p>
                                                <ul>
                                                    {projectsData[activeProject].tools.map((t, i) => (
                                                        <li key={i}>{`- ${t}`}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="term-actions">
                                                <a href={projectsData[activeProject].link} target="_blank" rel="noreferrer" className="term-link">
                                                    {`> EXECUTE SOURCE_CODE (${projectsData[activeProject].linkIcon.toUpperCase()})`}
                                                </a>
                                            </div>
                                            <div className="term-cursor"><span className="blink">_</span></div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                            <div className="monitor-base"></div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Projects;
