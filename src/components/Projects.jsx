import { motion } from "framer-motion";
import Mensaje from "./Message.jsx";
import "./Projects.css";

export default function ProjectsSection() {
    return (
        <div className="projects-section">
            <Mensaje texto="Estos son algunos de mis proyectos" />
            <div className="project-list">
                <motion.div
                    className="project-item"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <img src="/project1.png" alt="Proyecto 1" />
                    <div className="project-content">
                        <h3>Proyecto 1: Curso de diseño web de CoderHouse</h3>
                        <p>Una aplicación web construida con HTML y CSS.</p>
                        <a href="https://maxifuentes2.github.io/proyecto-final-fuentes/" target="_blank" rel="noopener noreferrer" className="project-link">
                            Ver Página
                        </a>
                        <a href="https://github.com/maxifuentes2/proyecto-final-fuentes" target="_blank" rel="noopener noreferrer" className="project-link">
                            Ver en GitHub
                        </a>
                    </div>
                </motion.div>
                <motion.div
                    className="project-item"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <img src="/project2.png" alt="Proyecto 2" />
                    <div className="project-content">
                        <h3>Proyecto 2: Curso de Javascript de CoderHouse</h3>
                        <p>Página web de gestión de stock de un almacén realizada utilizando HTML, CSS y Javascript</p>
                        <a href="https://maxifuentes2.github.io/proyectoFinalFuentes/" target="_blank" rel="noopener noreferrer" className="project-link">
                            Ver Página
                        </a>
                        <a href="https://github.com/maxifuentes2/proyectoFinalFuentes" target="_blank" rel="noopener noreferrer" className="project-link">
                            Ver en GitHub
                        </a>
                    </div>
                </motion.div>
                <motion.div
                    className="project-item"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <img src="/project3.png" alt="Proyecto 3" />
                    <div className="project-content">
                        <h3>Proyecto 3: Curso de React.js de CoderHouse</h3>
                        <p>Página web de ecommerce realizada utilizando React.js</p>
                        <a href="https://proyecto-final-fuentes-reactjs.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-link">
                            Ver Página
                        </a>
                        <a href="https://github.com/maxifuentes2/proyecto-final-fuentes-reactjs" target="_blank" rel="noopener noreferrer" className="project-link">
                            Ver en GitHub
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
