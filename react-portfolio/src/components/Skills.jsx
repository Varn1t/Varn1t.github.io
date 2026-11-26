import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// One list per radar quadrant (from the GitHub profile README tech stack).
// Angles are spread evenly inside each quadrant, so adding a skill needs no hand-placed angle.
const QUADRANTS = [
    ['Languages & Data', [
        { name: "Python", color: "#eab308", projects: ["AyurLex", "TraffiQ", "SkyFlow-MLOps", "EDAgent", "LoreLoop", "CineMatch"] },
        { name: "JavaScript", color: "#f7df1e", projects: [] },
        { name: "TypeScript", color: "#3178c6", projects: [] },
        { name: "Java", color: "#f97316", projects: [] },
        { name: "C / C++", color: "#9ca3af", projects: [] },
        { name: "PostgreSQL", color: "#336791", projects: ["Crime Record Management"] },
        { name: "MySQL", color: "#4479a1", projects: [] },
        { name: "MongoDB", color: "#4ea94b", projects: [] },
        { name: "SQLite", color: "#0ea5e9", projects: [] },
    ]],
    ['ML & AI', [
        { name: "Scikit-learn", color: "#f7931e", projects: ["SkyFlow-MLOps", "CineMatch"] },
        { name: "NumPy / Pandas", color: "#ec4899", projects: ["CineMatch", "EDAgent", "Student Performance EDA"] },
        { name: "SciPy", color: "#0c55a5", projects: [] },
        { name: "PyTorch & CUDA", color: "#ee4c2c", projects: [] },
        { name: "TensorFlow / Keras", color: "#ff6f00", projects: [] },
        { name: "Hugging Face", color: "#ffd21e", projects: [] },
        { name: "YOLOv8 / Ultralytics", color: "#14b8a6", projects: ["TraffiQ"] },
        { name: "OpenCV", color: "#5c3ee8", projects: ["TraffiQ"] },
        { name: "Object Tracking", color: "#06b6d4", projects: ["TraffiQ"] },
        { name: "OCR & VLMs", color: "#facc15", projects: [] },
        { name: "PyMuPDF", color: "#6366f1", projects: [] },
        { name: "LangChain / LangGraph", color: "#a855f7", projects: ["EDAgent", "LoreLoop", "SkyFlow-MLOps"] },
        { name: "FAISS", color: "#0467df", projects: ["LoreLoop"] },
        { name: "Ollama", color: "#e5e7eb", projects: ["AyurLex", "SkyFlow-MLOps", "LoreLoop"] },
        { name: "MLflow", color: "#0194e2", projects: ["SkyFlow-MLOps"] },
    ]],
    ['Web & Viz', [
        { name: "HTML / CSS", color: "#f43f5e", projects: [] },
        { name: "React", color: "#61dafb", projects: [] },
        { name: "FastAPI", color: "#009688", projects: ["AyurLex", "SkyFlow-MLOps"] },
        { name: "Flask", color: "#94a3b8", projects: ["TraffiQ"] },
        { name: "Uvicorn", color: "#499848", projects: [] },
        { name: "Pydantic", color: "#e92063", projects: [] },
        { name: "Streamlit", color: "#ff4b4b", projects: ["LoreLoop", "CineMatch"] },
        { name: "Matplotlib / Seaborn", color: "#4c72b0", projects: ["EDAgent", "Student Performance EDA"] },
        { name: "Plotly", color: "#7c86c4", projects: ["CineMatch"] },
        { name: "Chart.js", color: "#f5788d", projects: ["TraffiQ"] },
    ]],
    ['Tools & Cloud', [
        { name: "Git / GitHub", color: "#f05033", projects: [] },
        { name: "Docker", color: "#2496ed", projects: ["AyurLex", "SkyFlow-MLOps"] },
        { name: "Apache Airflow", color: "#017cee", projects: ["SkyFlow-MLOps"] },
        { name: "AWS (EC2 / S3 / IAM)", color: "#ff9900", projects: [] },
        { name: "Cloud Security & VPC", color: "#ef4444", projects: [] },
        { name: "Cloudflare", color: "#f38020", projects: [] },
        { name: "Vercel", color: "#d4d4d8", projects: [] },
        { name: "Bash / PowerShell", color: "#4eaa25", projects: [] },
        { name: "Pytest", color: "#2f9fe3", projects: [] },
        { name: "Jupyter / Colab", color: "#f97316", projects: ["Student Performance EDA"] },
        { name: "Botpress", color: "#d946ef", projects: [] },
        { name: "Figma / Photoshop", color: "#a259ff", projects: [] },
        { name: "Blender", color: "#f5792a", projects: [] },
        { name: "Notion", color: "#e5e5e5", projects: [] },
        { name: "Jira / Confluence", color: "#2684ff", projects: [] },
    ]],
];
const RADAR_SKILLS = QUADRANTS.flatMap(([category, skills], q) =>
    skills.map((sk, i) => ({
        ...sk,
        category,
        angle: q * 90 + 5 + (80 * i) / Math.max(1, skills.length - 1),
        slot: i, // which ring: consecutive skills alternate rings
    })));
const CATEGORIES = QUADRANTS.map(([c]) => c);

const Skills = () => {
    const radarSkills = RADAR_SKILLS;

    const [hoveredSkill, setHoveredSkill] = useState(null);
    const [filter, setFilter] = useState(null); // category name or null
    const sweepRef = useRef(null);
    const blipRefs = useRef([]);

    // Ping each blip as the sweep's leading edge passes over it.
    useEffect(() => {
        if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        let raf, prev = null;
        // blip angle is maths-style (counter-clockwise, y up); convert to screen clockwise degrees
        const screenAngle = radarSkills.map(sk => (360 - sk.angle) % 360);
        const tick = () => {
            const m = getComputedStyle(sweepRef.current).transform;
            if (m && m !== 'none') {
                const [a, b] = m.slice(7, -1).split(',').map(Number);
                // the sweep's bright leading edge points straight up (270deg clockwise from +x) at rotation 0
                const edge = ((Math.atan2(b, a) * 180) / Math.PI + 270 + 360) % 360;
                if (prev !== null) {
                    screenAngle.forEach((ang, i) => {
                        const passed = prev <= edge ? ang > prev && ang <= edge : ang > prev || ang <= edge;
                        const el = blipRefs.current[i];
                        if (passed && el && !el.classList.contains('dimmed')) {
                            el.classList.remove('sweep-ping');
                            void el.offsetWidth; // restart the CSS animation
                            el.classList.add('sweep-ping');
                        }
                    });
                }
                prev = edge;
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Spread blips out: each skill keeps its angle, and consecutive skills in a quadrant
    // alternate between three rings so neighbours never sit on top of each other.
    const RINGS = [16, 24, 32, 40]; // % of the board from the centre
    const getCoordinates = (angleDegrees, ringIndex) => {
        const distance = RINGS[ringIndex % RINGS.length];
        const angleRadian = (angleDegrees * Math.PI) / 180;
        const x = 50 + distance * Math.cos(angleRadian);
        const y = 50 - distance * Math.sin(angleRadian); // web y is inverted
        return { left: `${x}%`, top: `${y}%` };
    };

    const getCategory = (angle) => CATEGORIES[Math.min(3, Math.floor(((angle % 360) + 360) % 360 / 90))];

    const toggle = cat => setFilter(f => (f === cat ? null : cat));

    // clicking empty radar space filters to the quadrant you clicked
    const onBoardClick = e => {
        if (e.target.closest('.radar-blip')) return;
        const r = e.currentTarget.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = (r.top + r.height / 2) - e.clientY;
        toggle(getCategory(((Math.atan2(dy, dx) * 180) / Math.PI + 360) % 360));
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
                    <div className="radar-column">
                    <div className="radar-filters" role="group" aria-label="Filter skills by category">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                className={`radar-filter ${filter === cat ? 'active' : ''}`}
                                aria-pressed={filter === cat}
                                onClick={() => toggle(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="radar-board" onClick={onBoardClick} title="Click a quadrant to filter">
                        <div className="radar-sweep" ref={sweepRef}></div>

                        {/* Concentric rings denoting expertise */}
                        <div className="radar-ring r-1"></div>
                        <div className="radar-ring r-2"></div>
                        <div className="radar-ring r-3"></div>

                        {/* Axis lines */}
                        <div className="radar-crosshair vertical"></div>
                        <div className="radar-crosshair horizontal"></div>

                        {/* Blips */}
                        {radarSkills.map((skill, idx) => {
                            const coords = getCoordinates(skill.angle, skill.slot);
                            const isHovered = hoveredSkill === idx;
                            const dimmed = filter && skill.category !== filter;
                            return (
                                <div
                                    key={idx}
                                    ref={el => { blipRefs.current[idx] = el; }}
                                    className={`radar-blip ${isHovered ? 'hovered' : ''} ${dimmed ? 'dimmed' : ''}`}
                                    data-projects={skill.projects.join('|') || undefined}
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
                                            <span className="stat-value">{radarSkills[hoveredSkill].category}</span>
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
