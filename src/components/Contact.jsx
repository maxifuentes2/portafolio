import "./Contact.css";

export default function ContactSection() {
    return (
        <div className="contact-section">
            <h2>Contáctame</h2>
            <p>Email: <a href="mailto:estudiante@example.com">estudiante@example.com</a></p>
            <p>
                LinkedIn:{" "}
                <a
                    href="https://linkedin.com/in/tu-perfil"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Mi perfil
                </a>
            </p>
            <p>Teléfono: +54 9 261 123-4567</p>
        </div>
    );
}