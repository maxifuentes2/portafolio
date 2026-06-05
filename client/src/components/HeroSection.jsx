import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HeroSection.css";

gsap.registerPlugin(ScrollTrigger);

const letterVariants = {
    hidden: { y: 80, opacity: 0, rotateX: -15 },
    visible: (i) => ({
        y: 0,
        opacity: 1,
        rotateX: 0,
        transition: {
            delay: i * 0.04,
            duration: 0.6,
            ease: [0.25, 0.1, 0, 1],
        },
    }),
};

export default function HeroSection() {
    const ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".hero-content", {
                y: -200,
                opacity: 0,
                scale: 0.92,
                ease: "none",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.2,
                },
            });
            gsap.to(".scroll-indicator", {
                opacity: 0,
                y: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top top",
                    end: "bottom 80%",
                    scrub: true,
                },
            });
        }, ref);
        return () => ctx.revert();
    }, []);

    const name = "Máximo Fuentes";
    const letters = name.split("");

    return (
        <section id="hero" ref={ref} className="hero-section">
            <motion.div className="hero-content">
                <span className="section-number hero-section-number">00</span>
                <motion.p
                    className="hero-label"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                >
                    Desarrollador Full Stack
                </motion.p>

                <h1 className="hero-title">
                    {letters.map((letter, i) => (
                        <motion.span
                            key={i}
                            className={`hero-letter ${letter === " " ? "space" : ""}`}
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            variants={letterVariants}
                        >
                            {letter === " " ? "\u00A0" : letter}
                        </motion.span>
                    ))}
                </h1>

                <motion.div
                    className="hero-separator"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                />

                <motion.p
                    className="hero-subtitle"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                >
                    Estudiante de Lic. en Informática y Desarrollo de Software
                    en la Universidad del Aconcagua, Mendoza.
                </motion.p>

                <motion.div
                    className="hero-actions"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.65 }}
                >
                    <button
                        onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                        className="btn-primary"
                    >
                        <span>Ver proyectos</span>
                        <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                        </svg>
                    </button>
                    <button
                        onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                        className="btn-secondary"
                    >
                        <span>Contáctame</span>
                        <svg className="btn-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                        </svg>
                    </button>
                </motion.div>
            </motion.div>

            <div className="scroll-indicator">
                <span className="scroll-line" />
                <span className="scroll-text">Scroll</span>
            </div>
        </section>
    );
}
