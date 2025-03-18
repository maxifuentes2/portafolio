import { Link } from "react-router-dom";
import Mensaje from "./Message.jsx";
import Card from "./Card.jsx"
import "./Projects.css";



export default function ProjectsSection() {
    return (
        <div className="projects-section">
            <h2>Proyectos realizados</h2>
            <div className="project-list">
                <div className="project-item">
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
                </div>

                <div className="project-item">
                    <img src="/project2.png" alt="Proyecto 2" />
                    <div className="project-content">
                        <h3>Proyecto 2: Curso de Javascript de CoderHouse</h3>
                        <p>Página web de gestion de stock de un almacén realizada utilizando HTML, CSS y Javascript</p>
                        <a href="https://maxifuentes2.github.io/proyectoFinalFuentes/" target="_blank" rel="noopener noreferrer" className="project-link">
                            Ver Página
                        </a>
                        <a href="https://github.com/maxifuentes2/proyectoFinalFuentes" target="_blank" rel="noopener noreferrer" className="project-link">
                            Ver en GitHub
                        </a>
                    </div>
                    
                </div>
                <div className="project-item">
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
                    
                </div>
            </div>
        </div>
    );
}
