import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeModal = ({ isOpen, onClose }) => {
    const resumeUrl = "https://drive.google.com/file/d/1U-4jf4sHqRCGfReUimZMA2YsU-h4mUQX/view?usp=sharing";
    const downloadUrl = "https://drive.google.com/uc?export=download&id=1U-4jf4sHqRCGfReUimZMA2YsU-h4mUQX";

    const [hoveredNode, setHoveredNode] = useState(null);
    const [selectedNode, setSelectedNode] = useState(null);

    // Close modal on escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    // Reset interaction states on close
    useEffect(() => {
        if (!isOpen) {
            setHoveredNode(null);
            setSelectedNode(null);
        }
    }, [isOpen]);

    // Define Node Coordinates (viewBox: 0 0 460 360)
    const INPUT_NODES = [
        { id: 'in_acad', label: 'Academics', y: 70, color: '#818cf8', detailsId: 'academics' },
        { id: 'in_proj', label: 'Projects', y: 180, color: '#f472b6', detailsId: 'projects' },
        { id: 'in_lead', label: 'Leadership', y: 290, color: '#34d399', detailsId: 'leadership' }
    ];

    const HIDDEN_NODES = [
        { id: 'hid_ml', label: 'Python & ML', y: 50, color: '#eab308', detailsId: 'ml' },
        { id: 'hid_gen', label: 'GenAI & RAG', y: 136, color: '#a855f7', detailsId: 'genai' },
        { id: 'hid_cv', label: 'Computer Vision', y: 222, color: '#14b8a6', detailsId: 'cv' },
        { id: 'hid_db', label: 'Database & Web', y: 308, color: '#38bdf8', detailsId: 'db' }
    ];

    const OUTPUT_NODES = [
        { id: 'out_view', label: 'View online', y: 120, color: '#c084fc', url: resumeUrl },
        { id: 'out_down', label: 'Download pdf', y: 240, color: '#34d399', url: downloadUrl }
    ];

    // Node contents for Telemetry HUD
    const TELEMETRY_DATA = {
        default: {
            title: "AWAITING LOCK...",
            subtitle: "DEEP NEURAL NETWORK CV DECODER",
            summary: "Varnit Kalra — Computer Science Engineering student @ IITM. Interactive AI/ML capability modeling graph activated. Hover or select a neuron node to feed forward parameters and decode credentials.",
            stats: [
                { label: "TARGET FIELD", value: "AI / ML / Data Science" },
                { label: "ACADEMIC SYSTEM", value: "B.Tech CSE (2023 - 2027)" },
                { label: "CLEARANCE STATE", value: "[SECURE]" }
            ]
        },
        academics: {
            title: "NODE // FOUNDATION_ACADEMIC",
            subtitle: "IITM JANAKPURI // CSE",
            summary: "B.Tech Computer Science Engineering (August 2023 - August 2027). Currently building statistical, analytical, and computational foundations with high focus on Machine Learning & Artificial Intelligence architectures.",
            stats: [
                { label: "CURRENT GPA", value: "8.3 / 10.0" },
                { label: "AFFILIATION", value: "IITM, Janakpuri" },
                { label: "GRADUATION", value: "August 2027" }
            ]
        },
        projects: {
            title: "NODE // INTEL_PROJECTS",
            subtitle: "FLAGSHIP AI & ML BUILDS",
            summary: "Proven experience building and optimizing production-ready intelligent applications. Main builds cover CV-based forecasting, private offline RAG platforms, and multi-agent task orchestrators.",
            stats: [
                { label: "TraffiQ R² SCORE", value: "0.89 (Accurate)" },
                { label: "LOCAL LLM CORE", value: "Llama 3 (Ollama)" },
                { label: "AGENT ORCHESTRA", value: "LangGraph (Modular)" }
            ]
        },
        leadership: {
            title: "NODE // SYNERGY_LEADERSHIP",
            subtitle: "INFLUENCE & TEAM DIRECTION",
            summary: "Committed to mentoring and technical representation. Led school community as Tech President, mentored student innovators at InternWare, and represented institutions in competitive Model UN debates.",
            stats: [
                { label: "ROLE", value: "Mentor @ InternWare" },
                { label: "COMMUNITY", value: "School Tech President" },
                { label: "SKILLS", value: "MUN Delegate, Public Speaking" }
            ]
        },
        ml: {
            title: "NODE // ML_ENGINE_CORE",
            subtitle: "CORE MODELS & STATISTICAL DS",
            summary: "Advanced numerical modeling, machine learning, and neural network development. Expert in building end-to-end data processing pipelines, visualization tools, and model fine-tuning arrays.",
            stats: [
                { label: "CORE ENGINES", value: "PyTorch, TensorFlow" },
                { label: "ALGO & NUMERICAL", value: "Scikit-learn, SciPy, NumPy, Pandas" },
                { label: "DATA VIZ ARRAY", value: "Matplotlib, Seaborn, Plotly" }
            ]
        },
        genai: {
            title: "NODE // GENAI_AGENT_RAG",
            subtitle: "INTELLIGENT AGENTS & COGNITIVE RAG",
            summary: "Designing state-of-the-art agentic pipelines and knowledge retrieval architectures. Built EDAgent, a modular LangGraph-powered AI Data Analyst that automates complex EDA pipelines on 100,000+ rows and compiles polished HTML dashboards with 15+ automated visualizations. Also engineered a high-performance, private RAG Chatbot with interactive Streamlit sidebars, custom document parsing, FAISS vector search, and Llama 3 (Ollama) inference.",
            stats: [
                { label: "AGENT FRAMEWORK", value: "LangGraph (StateGraph)" },
                { label: "DATA ANALYST", value: "EDAgent Core Engine" },
                { label: "RAG PIPELINES", value: "LangChain & FAISS" }
            ]
        },
        cv: {
            title: "NODE // VISION_ANALYTICS_YOLO",
            subtitle: "COMPUTER VISION PIPELINES",
            summary: "Developing high-performance, real-time object tracking and computer vision models. Creator of TraffiQ: an OpenCV & YOLOv8 vehicle detection suite featuring a two-way control panel with collapsible sidebar; live sliders for YOLO confidence (0.10–0.95), speed threshold (20–120 km/h), and incident timeout (2–30s); and visualization mode toggles (Lanes, Heatmap, Speed, Timer) with 5-second cooldown protection.",
            stats: [
                { label: "DETECTION ENG", value: "YOLOv8 (Ultralytics)" },
                { label: "VISION PROCESS", value: "OpenCV (Real-Time)" },
                { label: "UTILITY", value: "Flow Analytics & Forecasting" }
            ]
        },
        db: {
            title: "NODE // PERSISTENCE_WEB_STACK",
            subtitle: "INTERACTIVE DATA PRODUCTS",
            summary: "Structuring and serving data products. Connecting transactional and vector stores to modern client applications, building full-fidelity Streamlit pipelines, Flask backends, and responsive React interfaces.",
            stats: [
                { label: "DATABASE CORES", value: "PostgreSQL, MySQL" },
                { label: "DATA APP ENG", value: "Streamlit, Flask" },
                { label: "CLIENT STACK", value: "React, HTML5, CSS3, Javascript" }
            ]
        }
    };

    const activeDetailsId = selectedNode || hoveredNode;
    const currentData = TELEMETRY_DATA[activeDetailsId] || TELEMETRY_DATA.default;

    // Helper to check if a path (synapse) should be active/glowing
    const isPathActive = (sourceId, targetId) => {
        const activeNode = selectedNode || hoveredNode;
        if (!activeNode) return false;

        // If input node is active, glow paths leaving it
        if (activeNode === 'academics' && sourceId === 'in_acad') return true;
        if (activeNode === 'projects' && sourceId === 'in_proj') return true;
        if (activeNode === 'leadership' && sourceId === 'in_lead') return true;

        // If hidden node is active, glow all its connections
        if (activeNode === 'ml' && (sourceId === 'in_acad' || sourceId === 'in_proj' || targetId === 'out_view' || targetId === 'out_down')) return targetId === 'hid_ml' || sourceId === 'hid_ml';
        if (activeNode === 'genai' && (sourceId === 'in_proj' || targetId === 'out_view' || targetId === 'out_down')) return targetId === 'hid_gen' || sourceId === 'hid_gen';
        if (activeNode === 'cv' && (sourceId === 'in_proj' || targetId === 'out_view' || targetId === 'out_down')) return targetId === 'hid_cv' || sourceId === 'hid_cv';
        if (activeNode === 'db' && (sourceId === 'in_acad' || sourceId === 'in_proj' || targetId === 'out_view' || targetId === 'out_down')) return targetId === 'hid_db' || sourceId === 'hid_db';

        return false;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="dossier-modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="neural-window"
                        initial={{ scale: 0.92, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.92, y: 20, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.45 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header Banner */}
                        <div className="dossier-header">
                            <span className="dossier-prompt">
                                <span className="glow-prompt">VARNIT_SYSTEM:</span>\NEURAL_DECIPHER&gt; RUN INFERENCE
                            </span>
                            <button className="dossier-close-btn" onClick={onClose}>[CLOSE X]</button>
                        </div>

                        {/* Split Panels */}
                        <div className="neural-split-body">
                            
                            {/* Panel 1: SVG Neural Graph */}
                            <div className="neural-graph-panel">
                                <div className="panel-title">[ DYNAMIC COMPUTATIONAL GRAPH ]</div>
                                <div className="svg-wrapper">
                                    <svg className="nn-canvas" viewBox="0 0 460 360" width="100%" height="100%">
                                        <defs>
                                            <linearGradient id="purple-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
                                                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.6" />
                                            </linearGradient>
                                            <filter id="neon-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                                                <feGaussianBlur stdDeviation="3" result="blur" />
                                                <feMerge>
                                                    <feMergeNode in="blur" />
                                                    <feMergeNode in="SourceGraphic" />
                                                </feMerge>
                                            </filter>
                                        </defs>

                                        {/* 1. Connections (Synapses) */}
                                        {INPUT_NODES.map(inNode => (
                                            HIDDEN_NODES.map(hidNode => {
                                                const isActive = isPathActive(inNode.id, hidNode.id);
                                                return (
                                                    <g key={`path-${inNode.id}-${hidNode.id}`}>
                                                        <line
                                                            x1={45}
                                                            y1={inNode.y}
                                                            x2={225}
                                                            y2={hidNode.y}
                                                            className={`nn-synapse ${isActive ? 'active' : ''}`}
                                                            stroke={isActive ? hidNode.color : "rgba(255,255,255,0.06)"}
                                                            strokeWidth={isActive ? 2 : 1}
                                                        />
                                                        {isActive && (
                                                            <line
                                                                x1={45}
                                                                y1={inNode.y}
                                                                x2={225}
                                                                y2={hidNode.y}
                                                                className="nn-synapse-pulse"
                                                                stroke={hidNode.color}
                                                                strokeWidth={2}
                                                            />
                                                        )}
                                                    </g>
                                                );
                                            })
                                        ))}

                                        {HIDDEN_NODES.map(hidNode => (
                                            OUTPUT_NODES.map(outNode => {
                                                const isActive = isPathActive(hidNode.id, outNode.id);
                                                return (
                                                    <g key={`path-${hidNode.id}-${outNode.id}`}>
                                                        <line
                                                            x1={225}
                                                            y1={hidNode.y}
                                                            x2={405}
                                                            y2={outNode.y}
                                                            className={`nn-synapse ${isActive ? 'active' : ''}`}
                                                            stroke={isActive ? hidNode.color : "rgba(255,255,255,0.06)"}
                                                            strokeWidth={isActive ? 2 : 1}
                                                        />
                                                        {isActive && (
                                                            <line
                                                                x1={225}
                                                                y1={hidNode.y}
                                                                x2={405}
                                                                y2={outNode.y}
                                                                className="nn-synapse-pulse"
                                                                stroke={hidNode.color}
                                                                strokeWidth={2}
                                                            />
                                                        )}
                                                    </g>
                                                );
                                            })
                                        ))}

                                        {/* 2. Layer Labels */}
                                        <text x={45} y={25} className="nn-layer-label" textAnchor="middle">INPUT</text>
                                        <text x={225} y={25} className="nn-layer-label" textAnchor="middle">HIDDEN LAYER (ReLU)</text>
                                        <text x={405} y={25} className="nn-layer-label" textAnchor="middle">OUTPUT</text>

                                        {/* 3. Input Layer Nodes */}
                                        {INPUT_NODES.map(node => {
                                            const isActive = activeDetailsId === node.detailsId;
                                            return (
                                                <g 
                                                    key={node.id} 
                                                    className="node-group cursor-pointer"
                                                    onMouseEnter={() => setHoveredNode(node.detailsId)}
                                                    onMouseLeave={() => setHoveredNode(null)}
                                                    onClick={() => setSelectedNode(selectedNode === node.detailsId ? null : node.detailsId)}
                                                >
                                                    <circle
                                                        cx={45}
                                                        cy={node.y}
                                                        r={isActive ? 16 : 14}
                                                        className="nn-node-bg"
                                                        fill="#110d24"
                                                        stroke={node.color}
                                                        strokeWidth={isActive ? 3 : 1.5}
                                                        filter={isActive ? "url(#neon-glow-filter)" : ""}
                                                    />
                                                    <circle
                                                        cx={45}
                                                        cy={node.y}
                                                        r={isActive ? 6 : 4}
                                                        fill={node.color}
                                                    />
                                                    <text 
                                                        x={45} 
                                                        y={node.y + (node.y > 180 ? -22 : 28)} 
                                                        className={`node-label ${isActive ? 'active' : ''}`}
                                                        fill={isActive ? '#fff' : '#8b949e'}
                                                        textAnchor="middle"
                                                    >
                                                        {node.label}
                                                    </text>
                                                </g>
                                            );
                                        })}

                                        {/* 4. Hidden Layer Nodes */}
                                        {HIDDEN_NODES.map(node => {
                                            const isActive = activeDetailsId === node.detailsId;
                                            return (
                                                <g 
                                                    key={node.id}
                                                    className="node-group cursor-pointer"
                                                    onMouseEnter={() => setHoveredNode(node.detailsId)}
                                                    onMouseLeave={() => setHoveredNode(null)}
                                                    onClick={() => setSelectedNode(selectedNode === node.detailsId ? null : node.detailsId)}
                                                >
                                                    <circle
                                                        cx={225}
                                                        cy={node.y}
                                                        r={isActive ? 16 : 14}
                                                        className="nn-node-bg"
                                                        fill="#110d24"
                                                        stroke={node.color}
                                                        strokeWidth={isActive ? 3 : 1.5}
                                                        filter={isActive ? "url(#neon-glow-filter)" : ""}
                                                    />
                                                    <circle
                                                        cx={225}
                                                        cy={node.y}
                                                        r={isActive ? 6 : 4}
                                                        fill={node.color}
                                                    />
                                                    <text 
                                                        x={205} 
                                                        y={node.y + 4} 
                                                        className={`node-label text-right ${isActive ? 'active' : ''}`}
                                                        fill={isActive ? '#fff' : '#8b949e'}
                                                        textAnchor="end"
                                                    >
                                                        {node.label}
                                                    </text>
                                                </g>
                                            );
                                        })}

                                        {/* 5. Output Layer Nodes */}
                                        {OUTPUT_NODES.map(node => (
                                            <a 
                                                href={node.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                key={node.id}
                                            >
                                                <g 
                                                    className="node-group cursor-pointer output-link-node"
                                                    onMouseEnter={() => setHoveredNode(node.id === 'out_view' ? 'out_view' : 'out_down')}
                                                    onMouseLeave={() => setHoveredNode(null)}
                                                >
                                                    <circle
                                                        cx={405}
                                                        cy={node.y}
                                                        r={14}
                                                        className="nn-node-bg"
                                                        fill="#110d24"
                                                        stroke={node.color}
                                                        strokeWidth={1.5}
                                                    />
                                                    <polygon
                                                        points={node.id === 'out_view' 
                                                            ? `${401},${node.y-4} ${411},${node.y} ${401},${node.y+4}` 
                                                            : `${405},${node.y-5} ${405},${node.y+3} ${401},${node.y+3} ${405},${node.y+7} ${409},${node.y+3} ${405},${node.y+3}`}
                                                        fill={node.color}
                                                    />
                                                    <text 
                                                        x={405} 
                                                        y={node.y + (node.y > 180 ? 26 : -20)} 
                                                        className="node-label output-lbl"
                                                        fill="#c084fc"
                                                        textAnchor="middle"
                                                    >
                                                        {node.label}
                                                    </text>
                                                </g>
                                            </a>
                                        ))}
                                    </svg>
                                </div>
                                <div className="graph-footer-hint">
                                    &gt;&gt; HOVER/CLICK NEURAL NODE TO ACTIVATE PROPAGATION PATHS
                                </div>
                            </div>

                            {/* Panel 2: Neural Telemetry decoder HUD */}
                            <div className="neural-telemetry-panel">
                                <div className="hud-header">
                                    <span className="hud-label">TELEMETRY_HUD // INFERENCE_DECODER</span>
                                    <span className="hud-blinker blink">SYS_LOCK</span>
                                </div>

                                <div className="hud-body">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeDetailsId || 'default'}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.25 }}
                                            className="hud-data-scroller"
                                        >
                                            <div className="telemetry-block-title" style={{ color: currentData.stats ? '#fff' : 'var(--accent-bright)' }}>
                                                {currentData.title}
                                            </div>
                                            <div className="telemetry-block-subtitle">
                                                {currentData.subtitle}
                                            </div>

                                            <div className="telemetry-divider"></div>

                                            <p className="telemetry-paragraph">
                                                {currentData.summary}
                                            </p>

                                            <div className="telemetry-grid">
                                                {currentData.stats.map((stat, i) => (
                                                    <div className="telemetry-grid-item" key={i}>
                                                        <div className="stat-hdr">{stat.label}</div>
                                                        <div className="stat-val">{stat.value}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Tactile Actions */}
                                <div className="hud-actions-footer">
                                    <a
                                        href={resumeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hud-tac-btn hud-tac-btn-primary"
                                    >
                                        <EyeIcon /> VIEW ONLINE
                                    </a>
                                    <a
                                        href={downloadUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hud-tac-btn hud-tac-btn-secondary"
                                    >
                                        <DownloadIcon /> DOWNLOAD CV
                                    </a>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const EyeIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const DownloadIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

export default ResumeModal;
