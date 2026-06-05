import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "Curso de Diseño Web - CoderHouse",
        description: "Una aplicación web construida con HTML y CSS.",
        img: "/project1.png",
        links: [
            { text: "Ver Página", url: "https://maxifuentes2.github.io/proyecto-final-fuentes/" },
            { text: "GitHub", url: "https://github.com/maxifuentes2/proyecto-final-fuentes" },
        ],
    },
    {
        title: "Curso de JavaScript - CoderHouse",
        description: "Página web de gestión de stock de un almacén utilizando HTML, CSS y JavaScript.",
        img: "/project2.png",
        links: [
            { text: "Ver Página", url: "https://maxifuentes2.github.io/proyectoFinalFuentes/" },
            { text: "GitHub", url: "https://github.com/maxifuentes2/proyectoFinalFuentes" },
        ],
    },
    {
        title: "Curso de React.js - CoderHouse",
        description: "Página web de ecommerce realizada con React.js.",
        img: "/project3.png",
        links: [
            { text: "Ver Página", url: "https://proyecto-final-fuentes-reactjs.vercel.app/" },
            { text: "GitHub", url: "https://github.com/maxifuentes2/proyecto-final-fuentes-reactjs" },
        ],
    },
    {
        title: "VNTG Hub",
        description: "E-commerce de ropa vintage.",
        img: "/project4.png",
        links: [
            { text: "GitHub", url: "https://github.com/maxifuentes2/vntg-hub" },
        ],
    },
];

export default function ProjectsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".projects-container", {
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
        <section id="projects" ref={ref} className="projects-section">
            <div className="projects-container">
                <motion.div
                    className="section-header"
                    initial={{ y: 40, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <span className="section-number">02</span>
                    <h2 className="section-title">
                        Mis <span className="gradient-text">Proyectos</span>
                    </h2>
                </motion.div>

                <motion.p
                    className="section-subtitle"
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.05 }}
                >
                    Aquí puedes ver algunos de los trabajos que he realizado.
                </motion.p>

                <div className="projects-list">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="project-card"
                            initial={{ y: 60, opacity: 0 }}
                            animate={isInView ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: "easeOut" }}
                        >
                            <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
                            <div className="project-image">
                                <div className="project-image-inner">
                                    <img src={project.img} alt={project.title} />
                                </div>
                            </div>
                            <div className="project-info">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-desc">{project.description}</p>
                                <div className="project-links">
                                    {project.links.map((link, i) => (
                                        <a
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                                            </svg>
                                            {link.text}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
