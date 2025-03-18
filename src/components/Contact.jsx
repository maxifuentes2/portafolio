import { motion } from "framer-motion";
import "./Contact.css";

export default function ContactSection() {
    return (
        <motion.div
            className="contact-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                Contáctame
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
            >
                Email: <a href="mailto:estudiante@example.com">maximofuentes@dev.com</a>
            </motion.p>

            <motion.p
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
            >
                LinkedIn:{" "}
                <a href="https://www.linkedin.com/in/máximo-fuentes-b74a092aa" target="_blank" rel="noopener noreferrer">
                    Mi perfil
                </a>
            </motion.p>
        </motion.div>
    );
}
