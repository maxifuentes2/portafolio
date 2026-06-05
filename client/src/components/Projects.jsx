import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectModal from "./ProjectModal.jsx";
import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "UrbanStyle - Diseño Web",
        description: "Tienda de ropa urbana construida con HTML, CSS y SASS.",
        img: "/project1.png",
        links: [
            { text: "Ver Página", url: "https://maxifuentes2.github.io/proyecto-final-fuentes/" },
            { text: "GitHub", url: "https://github.com/maxifuentes2/proyecto-final-fuentes" },
        ],
        readme: [
            {
                heading: "Descripción",
                text: "Sitio web multi-página para una tienda de ropa urbana. Proyecto final del curso de Diseño Web en CoderHouse.",
            },
            {
                heading: "Páginas",
                list: [
                    "Inicio con landing y navegación",
                    "Catálogo por categorías: Hoodies, Pantalones, Remeras",
                    "Contacto con formulario",
                    "Sobre nosotros",
                    "Devoluciones",
                ],
            },
            {
                heading: "Tecnologías",
                tags: ["HTML5", "CSS3", "SASS", "Responsive Design"],
            },
        ],
    },
    {
        title: "StockMaster - JavaScript",
        description: "App web de gestión de stock de almacén con login y CRUD.",
        img: "/project2.png",
        links: [
            { text: "Ver Página", url: "https://maxifuentes2.github.io/proyectoFinalFuentes/" },
            { text: "GitHub", url: "https://github.com/maxifuentes2/proyectoFinalFuentes" },
        ],
        readme: [
            {
                heading: "Descripción",
                text: "Sistema de gestión de stock para un almacén. Proyecto final del curso de JavaScript en CoderHouse.",
            },
            {
                heading: "Funcionalidades",
                list: [
                    "Login con usuario y contraseña (maxifuentes / coderhouse)",
                    "Agregar productos con nombre y cantidad",
                    "Eliminar productos individualmente o reducir stock",
                    "Interfaz dinámica con DOM manipulation",
                ],
            },
            {
                heading: "Tecnologías",
                tags: ["HTML5", "CSS3", "JavaScript", "LocalStorage", "DOM"],
            },
        ],
    },
    {
        title: "UrbanVerb",
        description: "E-commerce de ropa urbana realizado con React, carrito persistente y Firebase.",
        img: "/project3.png",
        links: [
            { text: "Ver Página", url: "https://proyecto-final-fuentes-reactjs.vercel.app/" },
            { text: "GitHub", url: "https://github.com/maxifuentes2/proyecto-final-fuentes-reactjs" },
        ],
        readme: [
            {
                heading: "Descripción",
                text: "Tienda de ropa urbana hecha en React, proyecto final para el curso de React en CoderHouse. Simple, pero funcional.",
            },
            {
                heading: "Funcionalidades",
                list: [
                    "Ver productos y filtrarlos por categoría",
                    "Ver detalles y agregar al carrito",
                    "Carrito persistente aunque cierres la página",
                    "Checkout con formulario de compra",
                    "Órdenes guardadas en Firebase con número de confirmación",
                ],
            },
            {
                heading: "Tecnologías",
                tags: ["React", "React Router DOM", "Firebase / Firestore", "SweetAlert2", "CSS"],
            },
            {
                heading: "Estructura",
                list: [
                    "ItemListContainer → Lista los productos",
                    "ItemDetailContainer → Muestra detalles",
                    "CartPage → El carrito",
                    "CheckoutForm → Formulario de compra",
                    "CartContext → Carrito global en toda la app",
                ],
            },
        ],
    },
    {
        title: "VNTG Hub",
        description: "E-commerce de coleccionables con carrito, chatbot IA, pagos y panel admin.",
        img: "/project4.png",
        links: [
            { text: "Ver Página", url: "https://vntg-hub.vercel.app/" },
            { text: "GitHub", url: "https://github.com/maxifuentes2/vntg-hub" },
        ],
        readme: [
            {
                heading: "Descripción",
                text: "Plataforma de comercio electrónico para coleccionistas de cultura pop. Catálogo de funkos, figuras de acción, artículos de anime y gaming con carrito, wishlist, chatbot con IA, panel de administración y pagos integrados.",
            },
            {
                heading: "Funcionalidades",
                list: [
                    "Catálogo con filtros por categoría, precio y búsqueda",
                    "Carrito persistente con descuentos automáticos",
                    "Wishlist sincronizada por contexto global",
                    "Autenticación con email + Google OAuth via Clerk",
                    "Chatbot IA con Groq (Llama 3) para consultas",
                    "Pagos con Mercado Pago y cripto vía NowPayments.io",
                    "Suscripción por email y recuperación de contraseña",
                    "Sistema de puntos canjeables por descuentos",
                    "Reproductor de video custom con controles avanzados",
                    "Panel admin con CRUD de productos y variantes",
                    "Soporte IMAP para escaneo automático de respuestas",
                    "Multi-moneda (USD / ARS) y modo oscuro",
                ],
            },
            {
                heading: "Stack Tecnológico",
                columns: [
                    {
                        title: "Frontend",
                        items: ["React 19 + Vite 6", "Tailwind CSS 4", "React Router 7", "Clerk + Google OAuth", "Mercado Pago SDK", "Lucide React", "Axios"],
                    },
                    {
                        title: "Backend & DB",
                        items: ["Node.js + Express 5", "MySQL 2 (Railway)", "JWT + Bcryptjs", "Groq SDK (Llama 3)", "Nodemailer", "ImapFlow + mailparser", "Multer"],
                    },
                ],
            },
            {
                heading: "Integraciones",
                tags: ["Mercado Pago", "NowPayments.io", "Google OAuth", "Clerk", "Groq (Llama 3)", "Gemini"],
            },
            {
                heading: "Equipo",
                list: [
                    "Máximo Fuentes",
                    "Enzo Delluniversidad",
                    "Ignacio Povolo",
                    "Gaspar Barroso",
                    "Santiago Zufia",
                    "Bruno Guzmán",
                ],
            },
        ],
    },
];

export default function ProjectsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const [modalProject, setModalProject] = useState(null);

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
                                    {project.readme && (
                                        <button
                                            className="project-link project-link-info"
                                            onClick={() => setModalProject(project)}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                                            </svg>
                                            Más info
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <ProjectModal
                project={modalProject}
                open={!!modalProject}
                onClose={() => setModalProject(null)}
            />
        </section>
    );
}
