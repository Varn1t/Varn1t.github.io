import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const POSITIONS = [
    { top: '10%', left: '8%', rotate: -12 },
    { top: '15%', left: '70%', rotate: 8 },
    { top: '50%', left: '5%', rotate: -5 },
    { top: '55%', left: '75%', rotate: 15 },
    { top: '30%', left: '40%', rotate: -8 },
    { top: '70%', left: '20%', rotate: 10 },
    { top: '20%', left: '55%', rotate: -15 },
    { top: '65%', left: '60%', rotate: 6 },
    { top: '40%', left: '15%', rotate: -3 },
    { top: '35%', left: '80%', rotate: 12 },
];

const MESSAGES = [
    "Catch me if you can!",
    "Too slow!",
    "Almost got me!",
    "Not even close!",
    "Try harder!",
    "Over here!",
    "Getting warmer...",
    "Nope, try again!",
    "Ha! Missed me!",
    "Keep trying!",
];

const Contact = () => {
    const [noteIndex, setNoteIndex] = useState(0);
    const [caught, setCaught] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);
    const [postCatchClicks, setPostCatchClicks] = useState(0);
    const containerRef = useRef(null);

    const handleNoteHover = useCallback(() => {
        if (caught) return;
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        // Let them catch it after 6+ attempts (random chance increases)
        if (newAttempts >= 6 && Math.random() < 0.35) {
            return; // Don't move — let them click
        }

        // Move to a different random position
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * POSITIONS.length);
        } while (newIndex === noteIndex);

        setNoteIndex(newIndex);
        setMessageIndex(Math.floor(Math.random() * MESSAGES.length));
    }, [caught, attempts, noteIndex]);

    const handleNoteCatch = () => {
        if (!caught) {
            setCaught(true);
            setPostCatchClicks(0);
        } else {
            const newClicks = postCatchClicks + 1;
            if (newClicks >= 3) {
                // Rematch!
                setCaught(false);
                setAttempts(0);
                setPostCatchClicks(0);
                setNoteIndex(Math.floor(Math.random() * POSITIONS.length));
                setMessageIndex(0);
            } else {
                setPostCatchClicks(newClicks);
            }
        }
    };

    const pos = POSITIONS[noteIndex];

    return (
        <section className="section contact-section" id="contact">
            <div className="container">
                <div className="contact-layout">
                    {/* Left side — the catch game */}
                    <div className="catch-zone" ref={containerRef}>
                        <div className="catch-bg-dots"></div>

                        <AnimatePresence mode="wait">
                            {!caught ? (
                                <motion.div
                                    key={`note-${noteIndex}`}
                                    className="runaway-note"
                                    style={{
                                        top: pos.top,
                                        left: pos.left,
                                    }}
                                    initial={{ opacity: 0, scale: 0.5, rotate: pos.rotate }}
                                    animate={{ opacity: 1, scale: 1, rotate: pos.rotate }}
                                    exit={{ opacity: 0, scale: 0.3, rotate: pos.rotate + 20 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    onMouseEnter={handleNoteHover}
                                    onClick={handleNoteCatch}
                                >
                                    <div className="note-paper">
                                        <span className="note-text">
                                            {attempts === 0 ? "Contact me!" : MESSAGES[messageIndex]}
                                        </span>
                                        <span className="note-sub">click me</span>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    className="caught-note"
                                    initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
                                    animate={{ opacity: 1, scale: 1, rotate: -5 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                    onClick={handleNoteCatch}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="note-paper caught">
                                        <span className="note-text">
                                            {postCatchClicks >= 2 ? "Want a rematch?" : "okay you win!"}
                                        </span>
                                        {postCatchClicks >= 2 && <span className="note-sub">click me</span>}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right side — contact info */}
                    <div className="contact-right">
                        <motion.h2
                            className="contact-headline"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            {caught ? (
                                <>OKAY FINE,<br /><span className="contact-headline-accent">YOU GOT ME!</span></>
                            ) : (
                                <>COULDN'T CATCH<br /><span className="contact-headline-accent">ME THERE?</span></>
                            )}
                        </motion.h2>

                        <p className="contact-sub">
                            {caught
                                ? "Here you go — reach out to me anytime!"
                                : "Reach out to me here instead"
                            }
                            <span className="contact-arrow">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </span>
                        </p>

                        <div className="contact-buttons">
                            <a href="mailto:Varnit.contact@gmail.com" className="contact-btn" id="contact-email">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                                Varnit.contact@gmail.com
                            </a>
                            <a href="https://github.com/Varn1t" target="_blank" rel="noreferrer" className="contact-btn" id="contact-github">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                                GitHub
                            </a>
                            <a href="https://in.linkedin.com/in/varnit-kalra" target="_blank" rel="noreferrer" className="contact-btn" id="contact-linkedin">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
