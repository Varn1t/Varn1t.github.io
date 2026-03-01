import React from 'react';
import { motion } from 'framer-motion';

const Education = () => {
    return (
        <section className="section section-dark" id="education">
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-tag">02. Education</span>
                    <h2 className="section-title">My Journey</h2>
                    <div className="section-line"></div>
                </div>
                <div className="timeline">
                    <motion.div
                        className="timeline-item reveal"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <div className="timeline-dot glow-dot"></div>
                        <div className="timeline-card current">
                            <div className="tl-badge">Current</div>
                            <div className="tl-period">2023 — 2027</div>
                            <h3 className="tl-title">Bachelor of Technology — Computer Science Engineering</h3>
                            <div className="tl-institution">📍 Institute of Information Technology &amp; Management, Janakpuri, India</div>
                            <div className="tl-stats">
                                <div className="tl-stat">
                                    <span className="tl-stat-val">8.5</span>
                                    <span className="tl-stat-label">GPA</span>
                                </div>
                                <div className="tl-stat">
                                    <span className="tl-stat-val">Expected Aug 2027</span>
                                    <span className="tl-stat-label">Graduation</span>
                                </div>
                            </div>
                            <div className="tl-tags">
                                <span className="tl-tag">Data Science</span>
                                <span className="tl-tag">Machine Learning</span>
                                <span className="tl-tag">AI</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="timeline-item reveal delay-1"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, type: "spring", bounce: 0.4, delay: 0.2 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <div className="timeline-dot"></div>
                        <div className="timeline-card">
                            <div className="tl-period">Graduated April 2023</div>
                            <h3 className="tl-title">High School Diploma (12th Grade)</h3>
                            <div className="tl-institution">📍 Summer Fields School, Gurugram, India</div>
                            <div className="tl-stats">
                                <div className="tl-stat">
                                    <span className="tl-stat-val">86.1%</span>
                                    <span className="tl-stat-label">Percentage</span>
                                </div>
                                <div className="tl-stat">
                                    <span className="tl-stat-val">Non-Medical Science (CS)</span>
                                    <span className="tl-stat-label">Stream</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="timeline-item reveal delay-2"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, type: "spring", bounce: 0.4, delay: 0.4 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <div className="timeline-dot"></div>
                        <div className="timeline-card">
                            <div className="tl-period">Graduated April 2021</div>
                            <h3 className="tl-title">Secondary School Certificate (10th Grade)</h3>
                            <div className="tl-institution">📍 CBSE Board</div>
                            <div className="tl-stats">
                                <div className="tl-stat">
                                    <span className="tl-stat-val">86%</span>
                                    <span className="tl-stat-label">Percentage</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Education;
