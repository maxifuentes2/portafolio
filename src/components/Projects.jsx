import "./Projects.css";

export default function ProjectsSection() {
    return (
        <div className="projects-section">
            <h2>Mis proyectos en desarrollo</h2>
            <div className="project-list">
                <div className="project-item">
                    <h3>Proyecto 1: Aplicación Web</h3>
                    <img
                        src="https://via.placeholder.com/300x200"
                        alt="Proyecto 1"
                        className="project-image"
                    />
                    <p>Una aplicación web construida con React y Node.js.</p>
                    <a
                        href="https://github.com/tu-usuario/proyecto1"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ver en GitHub
                    </a>
                </div>
                <div className="project-item">
                    <h3>Proyecto 2: Portfolio</h3>
                    <img
                        src="https://via.placeholder.com/300x200"
                        alt="Proyecto 2"
                        className="project-image"
                    />
                    <p>Este mismo sitio, creado con React y Vite.</p>
                    <a
                        href="https://github.com/tu-usuario/portfolio"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ver en GitHub
                    </a>
                </div>
            </div>
        </div>
    );
}