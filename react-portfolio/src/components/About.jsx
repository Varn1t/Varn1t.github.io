import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FILES = {
    'bio.md': {
        icon: '📝',
        lang: 'markdown',
        content: `
# Varnit Kalra
> Computer Science Engineering Student @ IITM

I'm passionate about building intelligent systems that solve real-world problems. My journey spans Data Science, Machine Learning, and AI development. 

Beyond code, I previously served at InternWare as an Executive (2023-2024) and then Mentor (2025 - May 2026), have represented institutions as a MUN delegate, and led as Tech President at Summer Fields School.

*I believe great engineers are also great communicators.*
`
    },
    'education.json': {
        icon: '📋',
        lang: 'json',
        content: `{
  "degree": "B.Tech Computer Science Engineering",
  "institution": "IITM Group of Institutions",
  "location": "Janakpuri, India",
  "graduation": "August 2027",
  "status": "In Progress"
}`
    },
    'skills.js': {
        icon: '⚡',
        lang: 'javascript',
        content: `import { Developer } from 'varnit';

const profile = new Developer({
  focus: ['Data Science', 'Machine Learning', 'MLOps', 'AI Development'],
  projects: [
    'AyurLex',
    'TraffiQ', 
    'CineMatch',
    'LoreLoop',
    'EDAgent',
    'SkyFlow-MLOps'
  ],
  traits: [
    'Problem Solver', 
    'Data-Driven', 
    'Fast Learner', 
    'Team Player'
  ]
});

export default profile;`
    },
    'hobbies.py': {
        icon: '🐍',
        lang: 'python',
        content: `class Varnit(Human):
    def get_offline_activities(self):
        return [
            "InternWare: Executive (2023-2024), Mentor (2025 - May 2026)",
            "Participating in Model UN",
            "Public Speaking",
            "Tech Leadership"
        ]
        
    def current_status(self):
        return "Chasing the intersection of data and impact."
`
    }
};

const SyntaxHighlighter = ({ content, lang }) => {
    const lines = content.trim().split('\n');

    const renderTokenizedLine = (line, index) => {
        if (lang === 'json') {
            return (
                <div key={index} className="ide-line">
                    <span className="line-num">{index + 1}</span>
                    <span className="line-content" dangerouslySetInnerHTML={{
                        __html: line
                            .replace(/"([^"]+)"(?=:)/g, '<span class="token-key">"$1"</span>')
                            .replace(/:\s*"(.*?)"/g, ': <span class="token-string">"$1"</span>')
                    }} />
                </div>
            );
        }

        if (lang === 'javascript') {
            let parsed = line
                .replace(/(['"])(.*?)\1/g, "__STR__$2__STR__")
                .replace(/\b(import|from|const|new|export|default|let|var|if|else|return|class|function|async|await|try|catch|finally|throw|extends|super)\b/g, "__KW__$1__KW__")
                .replace(/\b([A-Z][a-zA-Z0-9_]*)\b/g, "__CLS__$1__CLS__");

            parsed = parsed
                .replace(/__STR__(.*?)__STR__/g, '<span class="token-string">\'$1\'</span>')
                .replace(/__KW__(.*?)__KW__/g, '<span class="token-keyword">$1</span>')
                .replace(/__CLS__(.*?)__CLS__/g, '<span class="token-class">$1</span>');

            return (
                <div key={index} className="ide-line">
                    <span className="line-num">{index + 1}</span>
                    <span className="line-content" dangerouslySetInnerHTML={{ __html: parsed }} />
                </div>
            );
        }

        if (lang === 'python') {
            let parsed = line
                .replace(/(['"])(.*?)\1/g, "__STR__$2__STR__")
                .replace(/\b(class|def|return|if|else|elif|for|while|import|from|as|try|except|finally|with|lambda|yield|raise|pass|break|continue)\b/g, "__KW__$1__KW__")
                .replace(/\b([a-zA-Z_]\w*)(?=\()/g, "__METH__$1__METH__");

            parsed = parsed
                .replace(/__STR__(.*?)__STR__/g, '<span class="token-string">"$1"</span>')
                .replace(/__KW__(.*?)__KW__/g, '<span class="token-keyword">$1</span>')
                .replace(/__METH__(.*?)__METH__/g, '<span class="token-method">$1</span>');

            return (
                <div key={index} className="ide-line">
                    <span className="line-num">{index + 1}</span>
                    <span className="line-content" dangerouslySetInnerHTML={{ __html: parsed }} />
                </div>
            );
        }

        // Markdown / plain text
        return (
            <div key={index} className="ide-line">
                <span className="line-num">{index + 1}</span>
                <span className="line-content" dangerouslySetInnerHTML={{
                    __html: line
                        .replace(/^#\s+(.*)/g, '<span class="token-md-h1"># $1</span>')
                        .replace(/^>\s+(.*)/g, '<span class="token-md-quote">> $1</span>')
                        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
                }} />
            </div>
        );
    };

    return (
        <div className="ide-code">
            {lines.map((line, i) => renderTokenizedLine(line, i))}
        </div>
    );
};



const RUN_OUTPUT = [
    { cls: 'run-cmd', text: '$ python hobbies.py' },
    { cls: 'run-dim', text: '>>> Varnit().get_offline_activities()' },
    ...FILES['hobbies.py'].content.split('[')[1].split(']')[0].match(/"[^"]+"/g).map(t => ({ cls: 'run-out', text: '  • ' + t.slice(1, -1) })),
    { cls: 'run-dim', text: '>>> Varnit().current_status()' },
    { cls: 'run-out', text: "  'Chasing the intersection of data and impact.'" },
    { cls: 'run-ok', text: 'Process finished with exit code 0' },
];

const scrollToId = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const CommandPalette = ({ onClose, commands }) => {
    const [query, setQuery] = useState('');
    const [sel, setSel] = useState(0);
    const list = commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));

    const run = cmd => { onClose(); cmd.action(); };
    const onKey = e => {
        if (e.key === 'Escape') onClose();
        else if (e.key === 'ArrowDown') { e.preventDefault(); setSel(i => Math.min(i + 1, list.length - 1)); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); setSel(i => Math.max(i - 1, 0)); }
        else if (e.key === 'Enter' && list[sel]) run(list[sel]);
    };

    return (
        <div className="cmdk-overlay" onClick={onClose}>
            <div className="cmdk" role="dialog" aria-label="Command palette" onClick={e => e.stopPropagation()}>
                <input
                    autoFocus
                    className="cmdk-input"
                    placeholder="> Type a command"
                    aria-label="Search commands"
                    value={query}
                    onChange={e => { setQuery(e.target.value); setSel(0); }}
                    onKeyDown={onKey}
                />
                <ul className="cmdk-list" role="listbox">
                    {list.map((c, i) => (
                        <li
                            key={c.label}
                            role="option"
                            aria-selected={i === sel}
                            className={`cmdk-item ${i === sel ? 'active' : ''}`}
                            onMouseEnter={() => setSel(i)}
                            onClick={() => run(c)}
                        >
                            <span>{c.label}</span>
                            <span className="cmdk-hint">{c.hint}</span>
                        </li>
                    ))}
                    {list.length === 0 && <li className="cmdk-empty">No matching commands</li>}
                </ul>
            </div>
        </div>
    );
};

const About = ({ onOpenResume }) => {
    const [activeTab, setActiveTab] = useState('bio.md');
    const [panel, setPanel] = useState(null); // 'terminal' | 'problems' | null
    const [runLines, setRunLines] = useState(0);
    const [paletteOpen, setPaletteOpen] = useState(false);
    const [toast, setToast] = useState('');
    const runTimer = useRef(null);

    const runHobbies = () => {
        setActiveTab('hobbies.py');
        setPanel('terminal');
        setRunLines(0);
        clearInterval(runTimer.current);
        let n = 0;
        runTimer.current = setInterval(() => {
            n++;
            setRunLines(n);
            if (n >= RUN_OUTPUT.length) clearInterval(runTimer.current);
        }, 280);
    };

    useEffect(() => () => clearInterval(runTimer.current), []);

    useEffect(() => {
        const onKey = e => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setPaletteOpen(o => !o);
            }
        };
        addEventListener('keydown', onKey);
        return () => removeEventListener('keydown', onKey);
    }, []);

    const flash = msg => { setToast(msg); setTimeout(() => setToast(''), 1800); };

    const commands = [
        { label: 'Run hobbies.py', hint: 'python', action: () => { scrollToId('about'); runHobbies(); } },
        { label: 'Open resume', hint: 'PDF', action: () => onOpenResume?.() },
        { label: 'Go to Experience', hint: '#experience', action: () => scrollToId('experience') },
        { label: 'Go to Skills', hint: '#skills', action: () => scrollToId('skills') },
        { label: 'Go to Projects', hint: '#projects', action: () => scrollToId('projects') },
        { label: 'Go to Contact', hint: '#contact', action: () => scrollToId('contact') },
        {
            label: 'Copy email', hint: 'Varnit.contact@gmail.com',
            action: () => navigator.clipboard?.writeText('Varnit.contact@gmail.com').then(() => flash('Email copied'), () => flash('Copy failed')),
        },
        { label: 'Open GitHub', hint: 'github.com/Varn1t', action: () => window.open('https://github.com/Varn1t', '_blank', 'noreferrer') },
        { label: 'Open LinkedIn', hint: 'in/varnit-kalra', action: () => window.open('https://in.linkedin.com/in/varnit-kalra', '_blank', 'noreferrer') },
        { label: 'Show problems', hint: '1 warning', action: () => { scrollToId('about'); setPanel('problems'); } },
    ];

    return (
        <section className="section" id="about">
            <div className="container" style={{ maxWidth: '1000px' }}>
                <div className="section-header reveal">
                    <h2 className="section-title">About Me</h2>
                    <div className="section-line"></div>
                </div>

                <div className="ide-window reveal">
                    {/* Window Header */}
                    <div className="ide-header">
                        <div className="window-controls">
                            <span className="dot red"></span>
                            <span className="dot yellow"></span>
                            <span className="dot green"></span>
                        </div>
                        <div className="window-title">varnit_portfolio — {activeTab}</div>
                        <button className="cmdk-trigger" onClick={() => setPaletteOpen(true)} aria-label="Open command palette">
                            Commands <kbd>Ctrl K</kbd>
                        </button>
                    </div>

                    <div className="ide-body">
                        {/* Sidebar */}
                        <div className="ide-sidebar">
                            <div className="sidebar-title visible-desktop">EXPLORER</div>
                            <div className="folder visible-desktop">
                                <span className="folder-icon">📂</span> portfolio_src
                            </div>
                            <ul className="file-list mobile-scroll">
                                {Object.keys(FILES).map(fileName => (
                                    <li
                                        key={fileName}
                                        className={`file-item ${activeTab === fileName ? 'active' : ''}`}
                                        onClick={() => setActiveTab(fileName)}
                                    >
                                        <span className="file-icon">{FILES[fileName].icon}</span>
                                        <span className="file-name-text">{fileName}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Editor Area */}
                        <div className="ide-editor">
                            {/* Editor Tabs */}
                            <div className="editor-tabs">
                                {Object.keys(FILES).map(fileName => (
                                    <div
                                        key={fileName}
                                        className={`editor-tab ${activeTab === fileName ? 'active' : ''}`}
                                        onClick={() => setActiveTab(fileName)}
                                    >
                                        <span className="tab-icon">{FILES[fileName].icon}</span>
                                        {fileName}
                                    </div>
                                ))}
                                <button className="run-btn" onClick={runHobbies} title="Run hobbies.py">▶ Run</button>
                            </div>

                            {/* Code View / PDF View */}
                            <div className="editor-content">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <SyntaxHighlighter
                                            content={FILES[activeTab].content}
                                            lang={FILES[activeTab].lang}
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Bottom panel: terminal + problems */}
                            <div className="ide-panel">
                                <div className="ide-panel-tabs">
                                    <button className={panel === 'terminal' ? 'active' : ''} onClick={() => setPanel(p => p === 'terminal' ? null : 'terminal')}>TERMINAL</button>
                                    <button className={panel === 'problems' ? 'active' : ''} onClick={() => setPanel(p => p === 'problems' ? null : 'problems')}>
                                        PROBLEMS <span className="problems-badge">1</span>
                                    </button>
                                    <span className="ide-panel-status">0 errors · 1 warning</span>
                                </div>
                                {panel === 'terminal' && (
                                    <pre className="ide-panel-body">
                                        {runLines === 0 && <span className="run-dim">Press ▶ Run to execute hobbies.py</span>}
                                        {RUN_OUTPUT.slice(0, runLines).map((l, i) => <div key={i} className={l.cls}>{l.text}</div>)}
                                        {runLines > 0 && runLines < RUN_OUTPUT.length && <span className="blink">▌</span>}
                                    </pre>
                                )}
                                {panel === 'problems' && (
                                    <div className="ide-panel-body">
                                        <div className="problem-row">
                                            <span className="problem-warn">⚠</span>
                                            <span>coffee_level is critically low</span>
                                            <span className="problem-src">varnit.py · Ln 1</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {paletteOpen && <CommandPalette onClose={() => setPaletteOpen(false)} commands={commands} />}
            {toast && <div className="cmdk-toast" role="status">{toast}</div>}
        </section>
    );
};

export default About;
