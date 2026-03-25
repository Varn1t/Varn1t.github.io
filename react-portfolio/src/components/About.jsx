import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FILES = {
    'bio.md': {
        icon: '📝',
        lang: 'markdown',
        content: `
# Varnit Kalra
> Computer Science Engineering Student @ IITM

I'm passionate about building intelligent systems that solve real-world problems. My journey spans Data Science, Machine Learning, and AI development. 

Beyond code, I serve as a Mentor at InternWare, have represented institutions as a MUN delegate, and led as Tech President at Summer Fields School. 

*I believe great engineers are also great communicators.*
`
    },
    'education.json': {
        icon: '📋',
        lang: 'json',
        content: `{
  "degree": "B.Tech Computer Science Engineering",
  "institution": "Institute of Information Technology & Management",
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
  focus: ['Data Science', 'Machine Learning', 'AI Development'],
  projects: [
    'YOLO-based Traffic Management', 
    'Regression Models', 
    'Intelligent Chatbots'
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
            "Mentoring at InternWare",
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
            return (
                <div key={index} className="ide-line">
                    <span className="line-num">{index + 1}</span>
                    <span className="line-content" dangerouslySetInnerHTML={{
                        __html: line
                            .replace(/\b(import|from|const|new|export|default)\b/g, '<span class="token-keyword">$1</span>')
                            .replace(/\b([A-Z][a-zA-Z0-9_]*)\b/g, '<span class="token-class">$1</span>')
                            .replace(/'([^']+)'/g, "<span class='token-string'>'$1'</span>")
                    }} />
                </div>
            );
        }

        if (lang === 'python') {
            return (
                <div key={index} className="ide-line">
                    <span className="line-num">{index + 1}</span>
                    <span className="line-content" dangerouslySetInnerHTML={{
                        __html: line
                            .replace(/\b(class|def|return)\b/g, '<span class="token-keyword">$1</span>')
                            .replace(/\b([a-zA-Z_]\w*)(?=\()/g, '<span class="token-method">$1</span>')
                            .replace(/"([^"]+)"/g, '<span class="token-string">"$1"</span>')
                    }} />
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

const About = () => {
    const [activeTab, setActiveTab] = useState('bio.md');

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
                    </div>

                    <div className="ide-body">
                        {/* Sidebar */}
                        <div className="ide-sidebar">
                            <div className="sidebar-title">EXPLORER</div>
                            <div className="folder">
                                <span className="folder-icon">📂</span> portfolio_src
                            </div>
                            <ul className="file-list">
                                {Object.keys(FILES).map(fileName => (
                                    <li
                                        key={fileName}
                                        className={`file-item ${activeTab === fileName ? 'active' : ''}`}
                                        onClick={() => setActiveTab(fileName)}
                                    >
                                        <span className="file-icon">{FILES[fileName].icon}</span>
                                        {fileName}
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
                            </div>

                            {/* Code View */}
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
