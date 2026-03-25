import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="hero-workspace" id="hero">
            {/* Scattered desk objects */}
            <div className="desk-objects">
                <motion.img
                    src="/assets/sticky-ml.png"
                    alt="ML Engineer sticky note"
                    className="desk-obj sticky-1"
                    initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
                    animate={{ opacity: 1, scale: 1, rotate: -12, y: [0, -8, 0] }}
                    transition={{ duration: 0.8, delay: 0.3, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                />
                <motion.img
                    src="/assets/sticky-ai.png"
                    alt="AI Developer sticky note"
                    className="desk-obj sticky-2"
                    initial={{ opacity: 0, scale: 0.5, rotate: 8 }}
                    animate={{ opacity: 1, scale: 1, rotate: 8, y: [0, -6, 0] }}
                    transition={{ duration: 0.8, delay: 0.5, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
                />
                <motion.img
                    src="/assets/code-terminal.png"
                    alt="Code terminal"
                    className="desk-obj terminal-obj"
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
                    transition={{ duration: 0.8, delay: 0.7, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
                />
                <motion.img
                    src="/assets/headphones.png"
                    alt="Headphones"
                    className="desk-obj headphones-obj"
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0, y: [0, -7, 0] }}
                    transition={{ duration: 0.8, delay: 0.9, y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" } }}
                />
                <motion.img
                    src="/assets/coffee-cup.png"
                    alt="Coffee cup"
                    className="desk-obj coffee-obj"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
                    transition={{ duration: 0.8, delay: 1.1, y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" } }}
                />
                <motion.img
                    src="/assets/data-chart.png"
                    alt="Data chart"
                    className="desk-obj chart-obj"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 5, y: [0, -9, 0] }}
                    transition={{ duration: 0.8, delay: 0.6, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
                />
            </div>

            {/* Main hero content */}
            <div className="hero-center">
                <motion.h1
                    className="hero-title"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    WELCOME TO<br />
                    <span className="hero-title-accent">VARNIT'S</span> PORTFOLIO
                </motion.h1>

                <motion.a
                    href="#projects"
                    className="hero-cta"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    View Projects
                </motion.a>
            </div>
        </section>
    );
};

export default Hero;
