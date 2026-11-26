import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const COMMAND = 'building intelligent systems';
const TYPE_MS = 55;
const START_MS = 400;
const REDUCED = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
// the name and role fade in once the command has finished typing
const REVEAL = REDUCED ? 0 : (START_MS + COMMAND.length * TYPE_MS) / 1000 + 0.15;

const Hero = ({ onOpenResume }) => {
    const [typed, setTyped] = useState(REDUCED ? COMMAND.length : 0);

    useEffect(() => {
        if (REDUCED) return;
        let timer;
        const start = setTimeout(() => {
            timer = setInterval(() => {
                setTyped(n => {
                    if (n + 1 >= COMMAND.length) clearInterval(timer);
                    return n + 1;
                });
            }, TYPE_MS);
        }, START_MS);
        return () => { clearTimeout(start); clearInterval(timer); };
    }, []);

    const fade = delay => ({
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: REVEAL + delay },
    });

    return (
        <section className="hero-workspace" id="hero">
            <div className="hero-center">
                <p className="hero-prompt" aria-label={`varnit@kalra: ${COMMAND}`}>
                    <span className="hero-prompt-user">varnit@kalra</span>
                    <span className="hero-prompt-path">:~$</span>{' '}
                    <span className="hero-prompt-cmd">{COMMAND.slice(0, typed)}</span>
                    <span className="hero-prompt-caret blink" aria-hidden="true">▌</span>
                </p>

                <motion.h1 className="hero-title" {...fade(0)}>
                    Varnit <span className="hero-title-accent">Kalra</span>
                </motion.h1>

                <motion.p className="hero-role" {...fade(0.15)}>
                    AIML Intern @ ITG Telematics — building document AI, computer vision and LLM agents.
                </motion.p>

                <div className="hero-ctas">
                    <motion.a href="#projects" className="hero-cta" {...fade(0.3)}>
                        View Projects
                    </motion.a>
                    <motion.button onClick={onOpenResume} className="hero-cta secondary-cta" {...fade(0.4)}>
                        View Resume
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
