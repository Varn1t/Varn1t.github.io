import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const SUB_AGENTS = [
    { id: 'ml', label: 'ML Engineering', tool: 'sklearn · pytorch', icon: 'cog', color: '#a855f7', logs: ['Training models...', 'Checkpoint saved ✓'] },
    { id: 'data', label: 'Data Pipelines', tool: 'pandas · airflow', icon: 'db', color: '#818cf8', logs: ['Ingesting telemetry...', 'Pipeline complete ✓'] },
    { id: 'research', label: 'AI Research', tool: 'LLMs · RAG · Agents', icon: 'search', color: '#f472b6', logs: ['Querying knowledge base...', 'Report ready ✓'] },
    { id: 'deploy', label: 'Model Deployment', tool: 'FastAPI · Docker', icon: 'rocket', color: '#34d399', logs: ['Building container...', 'Deployed ✅'] },
];

const TECH_TAGS = ['Python', 'Machine Learning', 'LLMs', 'Data Pipelines', 'FastAPI'];

const LogStream = ({ logs, active }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!active) {
            setCount(0);
            return;
        }

        setCount(1);
        const timer = setInterval(() => {
            setCount(prev => {
                if (prev < logs.length) {
                    return prev + 1;
                }
                clearInterval(timer);
                return prev;
            });
        }, 600);

        return () => clearInterval(timer);
    }, [active, logs.length]);

    return (
        <div className="exp-log-stream">
            {!active && count === 0 && (
                <div className="exp-log-idle">Hover to run agent...</div>
            )}
            {logs.slice(0, count).map((line, i) => (
                <div key={i} className="exp-log-line">
                    <span className="exp-log-prefix">&gt;</span> {line}
                </div>
            ))}
        </div>
    );
};

const Connector = ({ delay = 0 }) => (
    <div className="exp-connector">
        <div className="exp-connector-line">
            <motion.div className="exp-connector-pulse" animate={{ x: ['0%', '100%'] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'linear', delay }} />
        </div>
        <span className="exp-connector-arrow">›</span>
    </div>
);

const SubAgentCard = ({ agent }) => {
    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (hovered) {
            setActive(false);
            const t = setTimeout(() => setActive(true), 60);
            return () => clearTimeout(t);
        } else { setActive(false); }
    }, [hovered]);

    return (
        <motion.div
            className="exp-subagent-card"
            style={{ '--agent-color': agent.color }}
            whileHover={{ y: -4, scale: 1.02 }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="exp-subagent-header">
                <span className="exp-subagent-icon" style={{ color: agent.color }}><AgentIcon type={agent.icon} /></span>
                <div className="exp-subagent-info">
                    <div className="exp-subagent-label">{agent.label}</div>
                    <div className="exp-subagent-tool">{agent.tool}</div>
                </div>
                <span className="exp-subagent-status" style={{ color: hovered ? agent.color : 'var(--text-muted)' }}>
                    {hovered ? '● RUNNING' : '○ IDLE'}
                </span>
            </div>
            <LogStream logs={agent.logs} active={active} />
        </motion.div>
    );
};

const Experience = () => (
    <section className="section experience-section" id="experience">
        <div className="container">
            <motion.div className="section-header reveal" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <h2 className="section-title">Experience</h2>
                <div className="section-line" />
            </motion.div>

            <motion.div className="exp-pipeline-label-row" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <span className="exp-badge">🤖 LLM AGENT PIPELINE</span>
                <span className="exp-badge-status">● ACTIVE RUN</span>
            </motion.div>

            <motion.div className="exp-pipeline-row" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}>
                <div className="exp-node exp-node--input">
                    <div className="exp-node-type" style={{ color: '#818cf8' }}>INPUT</div>
                    <div className="exp-node-icon" style={{ color: '#818cf8' }}><UserSvg /></div>
                    <div className="exp-node-label">User Query</div>
                    <div className="exp-node-detail">Real-World AI Task</div>
                </div>

                <Connector delay={0} />

                <motion.div
                    className="exp-node exp-node--hero"
                    animate={{ boxShadow: ['0 0 20px rgba(168,85,247,0.25)', '0 0 55px rgba(168,85,247,0.55)', '0 0 20px rgba(168,85,247,0.25)'] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                >
                    <div className="exp-node-type exp-node-type--hero">ORCHESTRATOR</div>
                    <div className="exp-node-icon exp-node-icon--hero"><BrainSvg /></div>
                    <div className="exp-node-label exp-node-label--hero">AI Intern</div>
                    <div className="exp-node-name">Varnit Kalra</div>
                    <div className="exp-node-company">ITG Telematics Pvt. Ltd.</div>
                    <div className="exp-node-since">Aug 2026 → Present</div>
                    <div className="exp-node-tags">
                        {TECH_TAGS.map(tag => <span key={tag} className="exp-node-tag">{tag}</span>)}
                    </div>
                </motion.div>

                <Connector delay={0.4} />

                <div className="exp-node exp-node--output">
                    <div className="exp-node-type" style={{ color: '#34d399' }}>OUTPUT</div>
                    <div className="exp-node-icon" style={{ color: '#34d399' }}><CheckSvg /></div>
                    <div className="exp-node-label">Deployed Solution</div>
                    <div className="exp-node-detail">Real-World Impact</div>
                </div>
            </motion.div>

            <div className="exp-fork-wrapper">
                <div className="exp-fork-stem" />
                <div className="exp-fork-bar" />
                <div className="exp-fork-ticks">
                    {SUB_AGENTS.map((_, i) => <div key={i} className="exp-fork-tick" />)}
                </div>
            </div>

            <motion.div className="exp-tools-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.45 }}>
                <ToolSvg /> Tool Calls &amp; Sub-Agents <span className="exp-tools-hint">(hover cards to run)</span>
            </motion.div>

            <div className="exp-subagent-grid">
                {SUB_AGENTS.map(agent => <SubAgentCard key={agent.id} agent={agent} />)}
            </div>

            <motion.div className="exp-meta-bar" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
                <span className="exp-meta-item">🕐 Duration: Aug 2026 – Present</span>
                <span className="exp-meta-sep">·</span>
                <span className="exp-meta-item">🏢 ITG Telematics Pvt. Ltd.</span>
                <span className="exp-meta-sep">·</span>
                <span className="exp-meta-item" style={{ color: '#34d399' }}>● Status: Active</span>
            </motion.div>
        </div>
    </section>
);

function AgentIcon({ type }) {
    if (type === 'cog') return <CogSvg />;
    if (type === 'db') return <DbSvg />;
    if (type === 'search') return <SearchSvg />;
    if (type === 'rocket') return <RocketSvg />;
    return null;
}
const s = { width: '1.3rem', height: '1.3rem' };
function UserSvg() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.6rem', height: '1.6rem' }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>; }
function BrainSvg() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '2.2rem', height: '2.2rem' }}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" /></svg>; }
function CheckSvg() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.6rem', height: '1.6rem' }}><polyline points="20 6 9 17 4 12" /></svg>; }
function CogSvg() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={s}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>; }
function DbSvg() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={s}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>; }
function SearchSvg() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={s}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>; }
function RocketSvg() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={s}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>; }
function ToolSvg() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '0.9rem', height: '0.9rem', display: 'inline', marginRight: '0.35rem', verticalAlign: 'middle' }}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>; }

export default Experience;
