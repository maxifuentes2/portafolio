import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAge, getStudyDuration } from "../utils/dates";
import "./AboutSection.css";

gsap.registerPlugin(ScrollTrigger);

const bioItems = [
    { label: "Ubicación", value: "Mendoza, Argentina" },
    { label: "Edad", value: `${getAge("2004-12-02")} Años` },
];

export default function AboutSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const studyDuration = getStudyDuration("2024-06-27");

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".about-container", {
                y: -60,
                ease: "none",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        }, ref);
        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={ref} className="about-section">
            <div className="about-container">
                <motion.h2
                    className="section-title"
                    initial={{ y: 40, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    Sobre <span className="gradient-text">mí</span>
                </motion.h2>

                <div className="about-grid">
                    <motion.div
                        className="about-card about-bio"
                        initial={{ y: 60, opacity: 0 }}
                        animate={isInView ? { y: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    >
                        <p className="about-text">
                            Amante del diseño web y la experiencia de usuario. Me encanta
                            trabajar en proyectos desafiantes y aprender nuevas tecnologías.
                        </p>

                        <div className="bio-list">
                            {bioItems.map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="bio-row"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={isInView ? { x: 0, opacity: 1 } : {}}
                                    transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                                >
                                    <span className="bio-label">{item.label}</span>
                                    <span className="bio-value">{item.value}</span>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            className="about-studies"
                            initial={{ x: -20, opacity: 0 }}
                            animate={isInView ? { x: 0, opacity: 1 } : {}}
                            transition={{ duration: 0.4, delay: 0.36 }}
                        >
                            <span className="bio-label">Estudios</span>
                            <p className="studies-text">
                                Licenciatura en Informática y Desarrollo de Software en la
                                Universidad del Aconcagua, Mendoza. (2025 - Actualidad)
                            </p>
                            <p className="studies-text">
                                CoderHouse (Full Stack Developer - {studyDuration})
                            </p>
                        </motion.div>

                        <motion.div
                            className="about-tech"
                            initial={{ x: -20, opacity: 0 }}
                            animate={isInView ? { x: 0, opacity: 1 } : {}}
                            transition={{ duration: 0.4, delay: 0.44 }}
                        >
                            <span className="bio-label">Tecnologías</span>
                            <div className="tech-tags">
                                {["HTML", "CSS", "JavaScript", "React.js"].map((tech, i) => (
                                    <span key={i} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="about-card about-stats"
                        initial={{ y: 60, opacity: 0 }}
                        animate={isInView ? { y: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    >
                        <div className="stat-item">
                            <span className="stat-number gradient-text">4+</span>
                            <span className="stat-label">Proyectos</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <span className="stat-number gradient-text">{Math.floor((Date.now() - new Date("2024-06-27").getTime()) / 31557600000)}+</span>
                            <span className="stat-label">Años estudiando</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <span className="stat-number gradient-text">∞</span>
                            <span className="stat-label">Ganas de aprender</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
