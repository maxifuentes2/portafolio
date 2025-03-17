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
                Software en la Universidad del Aconcagua, en Mendoza, Argentina.
            </h2>
            <p>
                Bienvenidos a mi portafolio personal. Aquí encontrarás información
                sobre mis estudios y proyectos.
            </p>
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