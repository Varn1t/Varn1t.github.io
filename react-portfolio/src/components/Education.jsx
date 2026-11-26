import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const BRANCHES = ['dev/btech', 'feature/high-school'];

// Draws the git graph in the gutter as you scroll: the main line runs down through every
// commit, and each older commit branches out and merges back into the one above it.
const BranchGraph = ({ notebookRef }) => {
    const [geo, setGeo] = useState(null);
    const paths = useRef([]);

    useEffect(() => {
        const nb = notebookRef.current;
        const measure = () => {
            // offsets, not rects: the commits animate in with a transform
            const ys = [...nb.querySelectorAll('.commit-dot')].map(d =>
                d.offsetParent.offsetTop + d.offsetTop + d.offsetHeight / 2);
            setGeo({ ys, h: nb.offsetHeight });
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(nb);
        return () => ro.disconnect();
    }, [notebookRef]);

    useEffect(() => {
        if (!geo) return;
        const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
        let raf = 0;
        const update = () => {
            // how far down the notebook the "pen" has reached
            const pen = innerHeight * 0.7 - notebookRef.current.getBoundingClientRect().top;
            paths.current.forEach((el, i) => {
                if (!el) return;
                const [a, b] = el.dataset.span.split(',').map(Number);
                const p = reduce ? 1 : Math.min(1, Math.max(0, (pen - a) / (b - a)));
                el.style.strokeDashoffset = 1 - p;
                el.parentNode.querySelectorAll(`[data-for="${i}"]`).forEach(m => { m.style.opacity = p >= 1 ? 1 : 0; });
            });
        };
        const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
        update();
        addEventListener('scroll', onScroll, { passive: true });
        return () => { removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
    }, [geo, notebookRef]);

    if (!geo || geo.ys.length < 2) return null;
    const X = 32, LANE = 58, R = 30;
    const { ys } = geo;
    const segs = [{ d: `M${X} ${ys[0]} L${X} ${ys.at(-1)}`, span: [ys[0], ys.at(-1)], cls: 'graph-main' }];
    for (let i = 0; i < ys.length - 1; i++) {
        const a = ys[i], b = ys[i + 1];
        segs.push({
            d: `M${X} ${a} C${X} ${a + R}, ${LANE} ${a + R * 0.4}, ${LANE} ${a + R} L${LANE} ${b - R} C${LANE} ${b - R * 0.4}, ${X} ${b - R}, ${X} ${b}`,
            span: [a, b], cls: 'graph-branch', label: BRANCHES[i], a, b,
        });
    }

    return (
        <svg className="branch-graph" width="90" height={geo.h} aria-hidden="true">
            {segs.map((sg, i) => (
                <g key={i}>
                    <path
                        ref={el => { paths.current[i] = el; }}
                        d={sg.d}
                        className={sg.cls}
                        pathLength="1"
                        data-span={sg.span.join(',')}
                    />
                    {sg.label && (
                        <>
                            <circle data-for={i} cx={X} cy={sg.a} r="5" className="graph-merge" />
                            <text data-for={i} x={LANE + 6} y={(sg.a + sg.b) / 2} className="graph-label"
                                transform={`rotate(-90 ${LANE + 6} ${(sg.a + sg.b) / 2})`}>{sg.label}</text>
                        </>
                    )}
                </g>
            ))}
        </svg>
    );
};

const Education = () => {
    const notebookRef = useRef(null);
    return (
        <section className="section notebook-section" id="education">
            <div className="container">
                <div className="section-header reveal">
                    <h2 className="section-title">Education <span className="git-branch-tag">main</span></h2>
                    <div className="section-line"></div>
                </div>

                <div className="git-notebook" ref={notebookRef}>
                    {/* The main Git branch line */}
                    <div className="git-line"></div>
                    <BranchGraph notebookRef={notebookRef} />

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
                                <MapPinIcon /> IITM Group of Institutions, Janakpuri
                            </div>
                            <div className="tl-stats">
                                <div className="tl-stat">
                                    <span className="tl-stat-val">8.3</span>
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
