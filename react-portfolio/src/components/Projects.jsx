import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimationControls, useMotionValue } from 'framer-motion';

// Retro sound effects, synthesised with Web Audio (no audio files). Only played after the
// visitor turns sound on, which also satisfies the browser's user-gesture rule for audio.
let audioCtx, master;
// Everything goes through one quiet master gain and a low-pass filter, so nothing is sharp or piercing.
const ac = () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const lp = audioCtx.createBiquadFilter();
        lp.type = 'lowpass'; lp.frequency.value = 1800;
        master = audioCtx.createGain(); master.gain.value = 0.5;
        master.connect(lp).connect(audioCtx.destination);
    }
    return audioCtx;
};
// soft envelope: short fade-in (no pop), smooth fade-out
const env = (g, peak, at, attack, dur) => {
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(peak, at + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
};
const noise = (dur, cutoff, peak, at) => {
    const a = ac(), len = Math.floor(a.sampleRate * dur), buf = a.createBuffer(1, len, a.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
    src.buffer = buf; f.type = 'lowpass'; f.frequency.value = cutoff;
    env(g, peak, at, 0.004, dur);
    src.connect(f).connect(g).connect(master); src.start(at); src.stop(at + dur);
};
const tone = (from, to, dur, peak, at, type = 'sine', attack = 0.01) => {
    const a = ac(), o = a.createOscillator(), g = a.createGain();
    o.type = type; o.frequency.setValueAtTime(from, at); o.frequency.exponentialRampToValueAtTime(to, at + dur);
    env(g, peak, at, attack, dur);
    o.connect(g).connect(master); o.start(at); o.stop(at + dur);
};
const SFX = {
    // muted "tock" of a plastic button
    click: () => { const t = ac().currentTime; tone(420, 260, 0.06, 0.25, t, 'triangle', 0.003); },
    // low, warm swell as the tube warms up
    powerOn: () => { const t = ac().currentTime; tone(55, 62, 0.9, 0.35, t + 0.03, 'sine', 0.15); noise(0.35, 300, 0.12, t + 0.03); },
    // gentle downward sigh
    powerOff: () => { const t = ac().currentTime; tone(160, 45, 0.6, 0.22, t, 'sine', 0.02); },
    // soft drive whirr with a few muffled head ticks
    seek: () => {
        const t = ac().currentTime;
        tone(95, 85, 0.9, 0.12, t, 'triangle', 0.08);
        for (let i = 0; i < 5; i++) noise(0.03, 700, 0.18, t + 0.12 + i * 0.13);
    },
};

// One floppy. Dropping or clicking it flies it to the drive, lines it up above the slot and
// slides it in (the part below the slot line is clipped away). When another disk replaces it,
// or the monitor powers off, it slides back out and returns to its place on the desk.
const FloppyDisk = ({ project, index, colors, inserted, onInsert, driveRef, overDrive }) => {
    const ref = useRef(null);
    const controls = useAnimationControls();
    const x = useMotionValue(0), y = useMotionValue(0), z = useMotionValue(0);
    // raised above the other disks while off its desk spot: flying, in the drive, or coming back
    const setAway = on => z.set(on ? 60 : 0);
    const wasInserted = useRef(false);
    const dragged = useRef(false); // a drag release must not also count as a click

    useEffect(() => {
        const el = ref.current;
        if (inserted && !wasInserted.current) {
            wasInserted.current = true;
            z.set(60);
            const d = driveRef.current.getBoundingClientRect(), r = el.getBoundingClientRect();
            const tx = x.get() + (d.left + d.width / 2) - (r.left + r.width / 2);
            const ty = y.get() + (d.top + d.height / 2) - (r.top + el.offsetHeight); // bottom edge on the slot
            controls.start({ x: tx, y: ty, rotate: 0, scale: 1, transition: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] } })
                .then(() => controls.start({
                    y: ty + el.offsetHeight, clipPath: 'inset(0% 0% 100% 0%)',
                    transition: { duration: 0.35, ease: 'easeIn' },
                }));
        } else if (!inserted && wasInserted.current) {
            wasInserted.current = false;
            controls.start({ y: y.get() - el.offsetHeight, clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.3, ease: 'easeOut' } })
                .then(() => controls.start({ x: 0, y: 0, transition: { type: 'spring', bounce: 0.3, duration: 0.7 } }))
                .then(() => z.set(0));
        }
    }, [inserted, controls, driveRef, x, y, z]);

    const home = () => controls.start({ x: 0, y: 0, transition: { type: 'spring', bounce: 0.35, duration: 0.6 } });

    return (
        <div className={`floppy-bay ${inserted ? 'empty' : ''}`}>
            <motion.div
                ref={ref}
                className={`floppy-disk ${inserted ? 'inserted' : ''}`}
                data-project={project.title}
                role="button"
                tabIndex={inserted ? -1 : 0}
                aria-label={`Load ${project.title}`}
                style={{ x, y, zIndex: z, clipPath: 'inset(0% 0% 0% 0%)' }}
                animate={controls}
                onTap={() => { if (!dragged.current) onInsert(index); }}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onInsert(index); } }}
                drag={!inserted}
                dragMomentum={false}
                dragElastic={0.9}
                whileDrag={{ scale: 1.1, rotate: -6, cursor: 'grabbing' }}
                onDragStart={() => { dragged.current = true; setAway(true); }}
                onDrag={(e, info) => driveRef.current.classList.toggle('drop-ready', overDrive(info.point))}
                onDragEnd={(e, info) => {
                    driveRef.current.classList.remove('drop-ready');
                    setTimeout(() => { dragged.current = false; }, 0);
                    if (!(overDrive(info.point) && onInsert(index))) home().then(() => setAway(false));
                }}
                whileHover={!inserted ? { scale: 1.05, rotate: -2 } : {}}
            >
                <div className="floppy-plastic" style={{ backgroundColor: colors[index % colors.length] }}>
                    <div className="floppy-shutter">
                        <div className="shutter-door"></div>
                    </div>
                    <div className="floppy-arrow"></div>
                    <div className="floppy-label-area">
                        <div className="floppy-label-paper">
                            <div className="label-stripe" style={{ backgroundColor: colors[(index + 1) % colors.length] }}></div>
                            <span className="label-text">{project.title.split(' ').slice(0, 3).join(' ')}</span>
                        </div>
                    </div>
                    <div className="floppy-notch"></div>
                </div>
            </motion.div>
        </div>
    );
};

const Projects = () => {
    const [activeProject, setActiveProject] = useState(null); // null = drive empty
    const [isBooting, setIsBooting] = useState(false);
    const driveRef = useRef(null);
    const monitorRef = useRef(null);
    const [sound, setSound] = useState(false);
    const sfx = name => { if (sound) SFX[name](); };
    const toggleSound = () => {
        if (!sound) { ac().resume(); SFX.click(); }
        setSound(v => !v);
    };

    // the glass highlight drifts opposite the cursor, so the screen reads as glass, not paint
    useEffect(() => {
        if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        let raf = 0;
        const onMove = e => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const el = monitorRef.current;
                if (!el) return;
                const r = el.getBoundingClientRect();
                // clamped so the highlight never slides far enough to show its edge
                const clamp = v => Math.max(-0.5, Math.min(0.5, v)).toFixed(3);
                el.style.setProperty('--rx', clamp((e.clientX - (r.left + r.width / 2)) / innerWidth));
                el.style.setProperty('--ry', clamp((e.clientY - (r.top + r.height / 2)) / innerHeight));
            });
        };
        addEventListener('mousemove', onMove);
        return () => { removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
    }, []);
    // 'off' -> 'warming' (static + tube warm-up) -> 'on' -> 'shutting' (collapse to a dot) -> 'off'
    const [power, setPower] = useState('off');
    const [bootProject, setBootProject] = useState(0);
    const powerTimer = useRef(null);
    useEffect(() => () => clearTimeout(powerTimer.current), []);

    const togglePower = () => {
        clearTimeout(powerTimer.current);
        if (power === 'off' || power === 'shutting') {
            setBootProject(activeProject);
            sfx('click'); sfx('powerOn');
            setPower('warming');
            powerTimer.current = setTimeout(() => setPower('on'), 900);
        } else {
            sfx('click'); sfx('powerOff');
            setPower('shutting');
            // picture collapses in 0.45s, then the afterglow dot fades; powering off also
            // ejects the disk, so the next power-on asks for one again
            powerTimer.current = setTimeout(() => { setPower('off'); setActiveProject(null); }, 1500);
        }
    };
    const screenOn = power !== 'off';

    // is the pointer over the drive slot (with some slack so the drop isn't fiddly)?
    const overDrive = point => {
        const r = driveRef.current.getBoundingClientRect();
        const x = point.x - scrollX, y = point.y - scrollY;
        return x > r.left - 40 && x < r.right + 40 && y > r.top - 50 && y < r.bottom + 50;
    };

    const projectsData = [
        {
            title: "AyurLex: Grounded Legal RAG",
            featured: true,
            link: "https://github.com/Varn1t/AyurLex",
            linkIcon: "github",
            points: [
                "Built a citation-grounded RAG assistant for Indian IP and AYUSH regulatory law over 3,491 provisions from 35 statutes and treaties, with click-to-source back to the PDF page",
                "Paired it with a deterministic compliance compiler: describe a formulation and 14 verified rules return blockers, obligations and fixes in ~30 ms, with no LLM in that path",
                "Hybrid BM25 + dense retrieval with an intent-aware reranker; on a held-out set written before tuning, 81% recall@5 and 8/8 correct refusals",
                "Added scope guardrails for foreign law, off-topic, clinical, law-evasion and prompt-injection questions, pinned by 17 tests within a 252-test suite",
                "Runs fully local on Ollama with zero network calls; answers in 11 Indian languages; ships as a five-view web app, a pip-installable CLI and a Docker image"
            ],
            tools: ["Python", "RAG", "Ollama", "FastAPI", "BM25", "Knowledge Graph", "PyMuPDF", "Docker"]
        },
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
            title: "EDAgent: Your data analyst+AI agent",
            featured: true,
            link: "https://github.com/Varn1t/EDAgent/tree/main",
            linkIcon: "github",
            points: [
                "Built a modular agentic data-science assistant using LangGraph (StateGraph) to automate exploratory data analysis (EDA) pipelines, reducing manual processing cycles by 80%",
                "Processed complex datasets of 100,000+ rows through self-correcting validation loops, ensuring dataset schema integrity and highly reliable code generation",
                "Generated comprehensive, interactive HTML reports featuring 15+ rich visualizations, data cleaning, advanced statistical analysis, diagnostic tests, and automated narrative summaries from LLM analysts",
                "Designed a sleek, responsive Streamlit dashboard with real-time agent execution telemetry, stage trackers, and granular parameter controllers"
            ],
            tools: ["Python", "Streamlit", "LangGraph", "Data Analysis", "LangChain", "Llama 3"]
        },
        {
            title: "LoreLoop - RAG Chatbot",
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
            title: "CineMatch",
            featured: true,
            link: "https://github.com/Varn1t/CineMatch",
            linkIcon: "github",
            points: [
                "Built a hybrid movie recommender fusing collaborative filtering (SVD matrix factorization) and content-based filtering (TF-IDF genre similarity) on MovieLens Latest Small",
                "Achieved robust performance with an RMSE of 0.871, Precision@10 of 55.8%, and Recall@10 of 66.2% verified via 5-fold cross-validation",
                "Designed an interactive Streamlit dashboard featuring seed-based recommendation generation, rating distribution histograms, and user similarity insights with A/B comparison",
                "Developed advanced analytics tabs displaying 2D PCA projections of SVD latent factors colored by genre, and a parameter sensitivity heatmap for dynamic alpha-tuning"
            ],
            tools: ["Python", "Streamlit", "Scikit-Learn", "Surprise (SVD)", "Pandas", "Matplotlib", "Collaborative Filtering", "TF-IDF"]
        },
        {
            title: "Student Performance EDA",
            featured: false,
            link: "https://github.com/Varn1t/Student-Dataset-EDA",
            linkIcon: "github",
            points: [
                "End-to-end EDA on 1,000-student dataset; applied binary, ordinal, and one-hot encoding",
                "Discovered a 10–11 point math score gap by lunch type (socio-economic proxy) and validated test prep impact (t = 5.70, p < 0.001) via hypothesis testing",
                "Proposed multiple linear regression as next step targeting RMSE-based evaluation"
            ],
            tools: ["Python", "Pandas", "Matplotlib", "Seaborn"]
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

    // returns whether the disk was accepted, so a rejected drop can fly home
    const handleDiskClick = (index) => {
        if (activeProject === index || isBooting) return false;
        sfx('seek');
        setIsBooting(true);
        setActiveProject(index);

        // Boot sequence timeout (1.5 seconds)
        setTimeout(() => {
            setIsBooting(false);
        }, 1500);
        return true;
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
                        {projectsData.map((project, index) => (
                            <FloppyDisk
                                key={index}
                                project={project}
                                index={index}
                                colors={floppyColors}
                                inserted={activeProject === index}
                                onInsert={handleDiskClick}
                                driveRef={driveRef}
                                overDrive={overDrive}
                            />
                        ))}
                    </div>

                    {/* RIGHT: CRT Terminal & Drive */}
                    <div className="crt-terminal-wrapper">

                        <div className={`floppy-drive ${activeProject === null ? 'awaiting' : ''}`} ref={driveRef} title="Drag a disk here">
                            <div className="drive-slot">
                                {activeProject !== null && (
                                    <div className="drive-disk-edge" style={{ backgroundColor: floppyColors[activeProject % floppyColors.length] }} />
                                )}
                            </div>
                            <div className={`drive-light ${isBooting ? 'reading' : 'idle'}`}></div>
                        </div>

                        <div className="crt-monitor" ref={monitorRef}>
                            <div className={`crt-glass ${screenOn ? '' : 'is-off'}`}>
                                <div className="scanlines"></div>
                                <div className="crt-vignette" aria-hidden="true"></div>
                                <div className="crt-reflection" aria-hidden="true"></div>
                                {power === 'shutting' && <div className="crt-afterglow" aria-hidden="true"></div>}
                                {power === 'warming' && <div className="crt-static" aria-hidden="true"></div>}
                                {/* remounts per project; a project switch while on plays a short glitch */}
                                {screenOn && <div
                                    key={activeProject ?? 'empty'}
                                    className={`crt-content ${power === 'warming' ? 'crt-power-on'
                                        : power === 'shutting' ? 'crt-power-off'
                                            : activeProject !== bootProject ? 'crt-switch' : ''}`}
                                >
                                    {isBooting ? (
                                        <div className="boot-sequence">
                                            <p className="boot-1">{`> MOUNTING DISK...`}</p>
                                            <p className="boot-2">{`> READING SECTORS... [OK]`}</p>
                                            <p className="boot-3">{`> DECRYPTING PROJECT DATA...`}</p>
                                            <p className="boot-4 blink">_</p>
                                        </div>
                                    ) : activeProject === null ? (
                                        <div className="no-disk">
                                            <p className="no-disk-title">NO DISK IN DRIVE A:</p>
                                            <p>&gt; Drag a floppy into the drive above</p>
                                            <p>&gt; or click one to load it</p>
                                            <p className="no-disk-arrow blink" aria-hidden="true">▲</p>
                                        </div>
                                    ) : (
                                        <motion.div
                                            className="project-data"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.1 }} // Instant CRT pop-in
                                        >
                                            <div className="terminal-header">
                                                <span>A:\&gt; RUN {projectsData[activeProject].title.split(/[:\s-]/)[0].toUpperCase().slice(0, 8)}.EXE</span>
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
                                </div>}
                            </div>
                            <button
                                className={`crt-sound ${sound ? 'on' : ''}`}
                                onClick={toggleSound}
                                aria-pressed={sound}
                                aria-label={sound ? 'Mute monitor sounds' : 'Turn on monitor sounds'}
                            >
                                {sound ? '♪ SOUND ON' : '♪ SOUND OFF'}
                            </button>
                            <span className="crt-badge" aria-hidden="true">VK-2000</span>
                            <button
                                className={`crt-power ${screenOn ? 'on' : ''}`}
                                onClick={togglePower}
                                aria-pressed={screenOn}
                                aria-label={screenOn ? 'Turn monitor off' : 'Turn monitor on'}
                            >
                                <span className="crt-power-led" aria-hidden="true"></span>
                                <span aria-hidden="true">⏻</span>
                                <span className="crt-power-label" aria-hidden="true">POWER</span>
                            </button>
                            <div className="monitor-base"></div>
                        </div>

                        {/* handwritten hint, only while the monitor is off */}
                        {power === 'off' && (
                            <div className="power-note" aria-hidden="true">
                                <span className="power-note-tape"></span>
                                <p>Press <b>POWER</b> to switch me on!</p>
                                <p className="power-note-sub">(bottom-right of the screen)</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Projects;
