import { Link } from "react-router-dom";
import Mensaje from "./Message.jsx";
import Card from "./Card.jsx"
import "./Home.css";

export default function HomeSection() {
    return (
        <div className="home">
            <Mensaje texto="¡Hola, bienvenido a mi portafolio!" />
            <h2>
                Estudiante de la Licenciatura en Informática y Desarrollo de
                Software.
            </h2>
            <div className="biography">
                <h3 className="title-biography"> 🌍 Sobre mí </h3>      
                <p className="text-biography">📍 Ubicación: Mendoza, Argentina 🇦🇷</p>
                <p className="text-biography">🎂 Edad: 20 Años</p>
                <p className="text-biography">🎓 Estudios:</p>
                <p className="text-biography">- Licenciatura en Informática y Desarrollo de Software en la Universidad del Aconcagua, Mendoza. (2025 - Actualidad)</p>
                <p className="text-biography">- CoderHouse (Full Stack Developer 2024 - 2025)</p>
            </div>


            <div className="card-container">
                <Card
                title="Proyectos"
                description="Explora mis trabajos en desarrollo y aplicaciones web."
                linkText="Ver proyectos"
                linkTo="/proyectos"
                imgSrc="/projects.png"
                />
                <Card
                title="Contacto"
                description="Estos son mis medios de contacto."
                linkText="Contáctame"
                linkTo="/contacto"
                imgSrc="/contact.png"
                />
            </div>
            
        </div>
    );
}