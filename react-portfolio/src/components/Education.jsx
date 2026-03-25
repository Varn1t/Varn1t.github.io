import React from 'react';
import { motion } from 'framer-motion';

const Education = () => {
    return (
        <section className="section notebook-section" id="education">
            <div className="container">
                <div className="section-header reveal">
                    <h2 className="section-title">Education <span className="git-branch-tag">main</span></h2>
                    <div className="section-line"></div>
                </div>

                <div className="git-notebook">
                    {/* The main Git branch line */}
                    <div className="git-line"></div>

                    {/* Commit 1: B.Tech */}
                    <motion.div
                        className="git-commit reveal"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <div className="commit-dot head-dot"></div>
                        <div className="commit-content sticky-note yellow-note">
                            <div className="masking-tape"></div>
                            <div className="commit-header">
                                <span className="commit-hash">commit <span className="hash-val">HEAD -&gt; main</span></span>
                                <span className="commit-date">Present — Aug 2027</span>
                            </div>
                            <div className="commit-message">
                                <code>git push origin dev/btech</code>
                            </div>
                            <h3 className="tl-title">Bachelor of Technology (CSE)</h3>
                            <div className="tl-institution">
                                <MapPinIcon /> Institute of Information Technology &amp; Management, Janakpuri
                            </div>
                            <div className="tl-stats">
                                <div className="tl-stat">
                                    <span className="tl-stat-val">8.5</span>
                                    <span className="tl-stat-label">Current GPA</span>
                                </div>
                            </div>
                            <div className="tl-tags">
                                <span className="tl-tag note-tag">Data Science</span>
                                <span className="tl-tag note-tag">Machine Learning</span>
                                <span className="tl-tag note-tag">AI</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Commit 2: 12th Grade */}
                    <motion.div
                        className="git-commit reveal delay-1"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, type: "spring", bounce: 0.4, delay: 0.2 }}
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <div className="commit-dot"></div>
                        <div className="commit-content sticky-note pink-note">
                            <div className="masking-tape"></div>
                            <div className="commit-header">
                                <span className="commit-hash">commit <span className="hash-val">a8f29bc</span></span>
                                <span className="commit-date">April 2023</span>
                            </div>
                            <div className="commit-message">
                                <code>git merge feature/high-school</code>
                            </div>
                            <h3 className="tl-title">High School Diploma (12th Grade)</h3>
                            <div className="tl-institution">
                                <MapPinIcon /> Summer Fields School, Gurugram
                            </div>
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

                    {/* Commit 3: 10th Grade */}
                    <motion.div
                        className="git-commit reveal delay-2"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, type: "spring", bounce: 0.4, delay: 0.4 }}
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <div className="commit-dot"></div>
                        <div className="commit-content sticky-note blue-note">
                            <div className="masking-tape"></div>
                            <div className="commit-header">
                                <span className="commit-hash">commit <span className="hash-val">f1d84e2</span></span>
                                <span className="commit-date">April 2021</span>
                            </div>
                            <div className="commit-message">
                                <code>git init curriculum/basics</code>
                            </div>
                            <h3 className="tl-title">Secondary School Certificate (10th)</h3>
                            <div className="tl-institution">
                                <MapPinIcon /> CBSE Board
                            </div>
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

const MapPinIcon = () => (
    <svg className="inline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
);

export default Education;
