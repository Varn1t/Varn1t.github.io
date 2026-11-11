import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Skills = () => {
    const radarSkills = [
        // Top Right (0 to 90) -> Languages
        { name: "Python", prof: 92, angle: 15, color: "#eab308", projects: ["AyurLex", "TraffiQ", "SkyFlow-MLOps", "EDAgent", "LoreLoop", "CineMatch"] },
        { name: "PostgreSQL", prof: 70, angle: 35, color: "#336791", projects: ["Crime Record Management"] },
        { name: "MySQL", prof: 70, angle: 55, color: "#22c55e", projects: [] },
        { name: "C / C++", prof: 65, angle: 75, color: "#9ca3af", projects: [] },
        { name: "Java", prof: 40, angle: 88, color: "#f97316", projects: [] },

        // Top Left (90 to 180) -> ML / AI Tools
        { name: "Scikit-learn", prof: 85, angle: 96, color: "#3b82f6", projects: ["SkyFlow-MLOps", "CineMatch", "Car Price Prediction", "House Price Prediction"] },
        { name: "NumPy / Pandas", prof: 88, angle: 107, color: "#ec4899", projects: ["CineMatch", "Student Performance EDA"] },
        { name: "HuggingFace", prof: 78, angle: 118, color: "#ffcc00", projects: [] },
        { name: "YOLOv8 & OpenCV", prof: 75, angle: 129, color: "#14b8a6", projects: ["TraffiQ"] },
        { name: "LangChain / Graph", prof: 85, angle: 140, color: "#a855f7", projects: ["EDAgent", "LoreLoop"] },
        { name: "PyTorch & CUDA", prof: 72, angle: 151, color: "#ee4c2c", projects: [] },
        { name: "Object Tracking", prof: 72, angle: 162, color: "#06b6d4", projects: ["TraffiQ"] },
        { name: "OCR & VLMs", prof: 70, angle: 173, color: "#facc15", projects: [] },

        // Bottom Left (180 to 270) -> Web Dev
        { name: "HTML / CSS", prof: 80, angle: 192, color: "#f43f5e", projects: [] },
        { name: "JavaScript", prof: 72, angle: 207, color: "#eab308", projects: [] },
        { name: "React", prof: 60, angle: 222, color: "#3b82f6", projects: [] },
        { name: "Streamlit", prof: 85, angle: 237, color: "#ff4b4b", projects: ["EDAgent", "LoreLoop", "CineMatch"] },
        { name: "Flask", prof: 65, angle: 252, color: "#64748b", projects: ["TraffiQ", "Car Price Prediction"] },
        { name: "FastAPI", prof: 75, angle: 266, color: "#009688", projects: ["AyurLex"] },

        // Bottom Right (270 to 360) -> Tools & Env
        { name: "Git / GitHub", prof: 85, angle: 276, color: "#a3e635", projects: [] },
        { name: "Docker & MLOps", prof: 82, angle: 289, color: "#2496ed", projects: ["AyurLex", "SkyFlow-MLOps"] },
        { name: "Botpress", prof: 70, angle: 302, color: "#d946ef", projects: [] },
        { name: "Cloudflare", prof: 65, angle: 315, color: "#f38020", projects: [] },
        { name: "Bash / PowerShell", prof: 70, angle: 328, color: "#4eaa25", projects: [] },
        { name: "Jupyter / Colab", prof: 90, angle: 341, color: "#f97316", projects: ["House Price Prediction", "Student Performance EDA"] },
        { name: "VS Code", prof: 90, angle: 354, color: "#0ea5e9", projects: [] },
    ];

    const [hoveredSkill, setHoveredSkill] = useState(null);

    const getCoordinates = (angleDegrees, proficiency) => {
        // Center is expert (100%), Edge is beginner (0%)
        // So distance represents how much they have left to learn.
        // We cap it so they aren't on the extreme edge bounding box boundaries.
        const distance = ((100 - proficiency) / 100) * 42;
        const angleRadian = (angleDegrees * Math.PI) / 180;
        const x = 50 + distance * Math.cos(angleRadian);
        const y = 50 - distance * Math.sin(angleRadian); // web y is inverted
        return { left: `${x}%`, top: `${y}%` };
    };

    const getCategory = (angle) => {
        if (angle >= 0 && angle < 90) return "Core Languages";
        if (angle >= 90 && angle < 180) return "ML & AI Tools";
        if (angle >= 180 && angle < 270) return "Web Development";
        return "Dev Environment";
    };

    return (
        <section className="section radar-section" id="skills">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">Skills &amp; Tech Radar</h2>
                    <div className="section-line"></div>
                </motion.div>

                <motion.div
                    className="radar-layout"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                >

                    {/* The Sonar Screen */}
                    <div className="radar-board">
                        <div className="radar-sweep"></div>

                        {/* Concentric rings denoting expertise */}
                        <div className="radar-ring r-1"></div>
                        <div className="radar-ring r-2"></div>
                        <div className="radar-ring r-3"></div>

                        {/* Axis lines */}
                        <div className="radar-crosshair vertical"></div>
                        <div className="radar-crosshair horizontal"></div>

                        {/* Blips */}
                        {radarSkills.map((skill, idx) => {
                            const coords = getCoordinates(skill.angle, skill.prof);
                            const isHovered = hoveredSkill === idx;
                            return (
                                <div
                                    key={idx}
                                    className={`radar-blip ${isHovered ? 'hovered' : ''}`}
                                    style={{
                                        left: coords.left,
                                        top: coords.top,
                                        '--blip-color': skill.color,
                                        '--anim-delay': `${idx * 0.1}s`
                                    }}
                                    onMouseEnter={() => setHoveredSkill(idx)}
                                    onMouseLeave={() => setHoveredSkill(null)}
                                >
                                    <div className="blip-core"></div>
                                    <div className="blip-ping"></div>
                                    <div className="blip-label">{skill.name}</div>
                                </div>
                            );
                        })}
                    </div>

                    {/* HUD Info Panel */}
                    <div className="radar-hud">
                        <div className="hud-header">
                            <span className="hud-title">TARGET TELEMETRY</span>
                            <span className="hud-status blink">REC</span>
                        </div>
                        <div className="hud-content">
                            <AnimatePresence mode="wait">
                                {hoveredSkill !== null ? (
                                    <motion.div
                                        key="active"
                                        className="hud-active-target"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <h3 className="target-name" style={{ color: radarSkills[hoveredSkill].color }}>
                                            {radarSkills[hoveredSkill].name}
                                        </h3>
                                        <div className="target-stat">
                                            <span className="stat-label">CATEGORY</span>
                                            <span className="stat-value">{getCategory(radarSkills[hoveredSkill].angle)}</span>
                                        </div>
                                        <div className="target-stat">
                                            <span className="stat-label">PROFICIENCY</span>
                                            <div className="prof-bar-wrapper">
                                                <div
                                                    className="prof-bar-fill"
                                                    style={{
                                                        width: `${radarSkills[hoveredSkill].prof}%`,
                                                        backgroundColor: radarSkills[hoveredSkill].color
                                                    }}
                                                ></div>
                                            </div>
                                            <span className="stat-value">{radarSkills[hoveredSkill].prof}%</span>
                                        </div>
                                        {radarSkills[hoveredSkill].projects.length > 0 && (
                                            <div className="target-stat">
                                                <span className="stat-label">USED IN</span>
                                                <div className="linked-projects">
                                                    {radarSkills[hoveredSkill].projects.map((p, i) => (
                                                        <a key={i} href="#projects" className="linked-project-chip">{p}</a>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="idle"
                                        className="hud-idle"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <ScanIcon />
                                        <p className="scan-text">AWAITING TARGET LOCK</p>
                                        <p className="scan-sub">Hover over a radar blip to analyze skill capability.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};

const ScanIcon = () => (
    <svg className="scan-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 3a2 2 0 0 0-2 2" />
        <path d="M19 3a2 2 0 0 1 2 2" />
        <path d="M21 19a2 2 0 0 1-2 2" />
        <path d="M5 21a2 2 0 0 1-2-2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v2" /><path d="M12 20v2" />
        <path d="M22 12h-2" /><path d="M4 12H2" />
    </svg>
);

export default Skills;
