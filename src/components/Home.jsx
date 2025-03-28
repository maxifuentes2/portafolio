import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Mensaje from "./Message.jsx";
import Card from "./Card.jsx";
import "./Home.css";

export default function HomeSection() {
    return (
        <motion.div 
            className="home" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <Mensaje texto="¡Bienvenido a mi portafolio!" />
            
            <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                Estudiante de Lic en Informática y Desarrollo de Software.
            </motion.h2>
            
            <div className="biography">
                <motion.h3
                    className="title-biography"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    🌍 Sobre mí
                </motion.h3>
                
                <motion.p
                    className="text-biography"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    · Ubicación: Mendoza, Argentina 
                </motion.p>
                
                <motion.p
                    className="text-biography"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    · Edad: 20 Años
                </motion.p>
                
                <motion.p
                    className="text-biography"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                >
                    · Estudios:
                </motion.p>
                
                <motion.p
                    className="text-biography"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                >
                    · Licenciatura en Informática y Desarrollo de Software en la Universidad del Aconcagua, Mendoza. (2025 - Actualidad)
                </motion.p>
                
                <motion.p
                    className="text-biography"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                >
                    - CoderHouse (Full Stack Developer 2024 - 2025)
                </motion.p>
            </div>

            <motion.div
                className="card-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className="card-item"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <Card
                        title="Proyectos"
                        description="Explora mis trabajos en desarrollo y aplicaciones web."
                        linkText="Ver proyectos"
                        linkTo="/proyectos"
                        imgSrc="/projects.png"
                    />
                </motion.div>

                <motion.div
                    className="card-item"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                >
                    <Card
                        title="Contacto"
                        description="Estos son mis medios de contacto."
                        linkText="Contáctame"
                        linkTo="/contacto"
                        imgSrc="/contact.png"
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
