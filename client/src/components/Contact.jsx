import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useToast } from "./Toast.jsx";
import "./Contact.css";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".contact-container", {
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setSent(false);

        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 15000);

            const res = await fetch(`${API_URL}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                signal: controller.signal,
            });
            clearTimeout(timeout);

            if (!res.ok) throw new Error("Error al enviar");

            setSent(true);
            setFormData({ name: "", email: "", message: "" });
            toast("Mensaje enviado con éxito", "success");
        } catch (error) {
            toast("Error al enviar el mensaje. Intenta de nuevo.", "error");
            console.error(error);
        } finally {
            setSending(false);
        }
    };

    return (
        <section id="contact" ref={ref} className="contact-section">
            <div className="contact-container">
                <motion.div
                    className="section-header"
                    initial={{ y: 40, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <span className="section-number">03</span>
                    <h2 className="section-title">
                        Contáctame
                    </h2>
                </motion.div>

                <motion.p
                    className="section-subtitle"
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.05 }}
                >
                    ¿Tienes un proyecto en mente o simplemente quieres conectar?
                    Estoy abierto a nuevas oportunidades.
                </motion.p>

                <div className="contact-grid">
                    <motion.div
                        className="contact-info"
                        initial={{ x: -60, opacity: 0 }}
                        animate={isInView ? { x: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    >
                        <div className="contact-info-item">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/>
                            </svg>
                            <div>
                                <span className="ci-label">Email</span>
                                <a href="mailto:maximofuentesdev@gmail.com">maximofuentesdev@gmail.com</a>
                            </div>
                        </div>
                        <div className="contact-info-item">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                            </svg>
                            <div>
                                <span className="ci-label">LinkedIn</span>
                                <a href="https://www.linkedin.com/in/m%C3%A1ximo-fuentes-b74a092aa" target="_blank" rel="noopener noreferrer">
                                    /in/máximo-fuentes
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="contact-form-card"
                        initial={{ x: 60, opacity: 0 }}
                        animate={isInView ? { x: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <label className="form-group">
                                    <span className="form-label">Nombre</span>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Tu nombre"
                                        required
                                    />
                                </label>
                                <label className="form-group">
                                    <span className="form-label">Email</span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="tu@email.com"
                                        required
                                    />
                                </label>
                            </div>
                            <label className="form-group">
                                <span className="form-label">Mensaje</span>
                                <textarea
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Escribe tu mensaje aquí..."
                                    required
                                ></textarea>
                            </label>
                            <button
                                type="submit"
                                disabled={sending}
                                className="btn-primary submit-btn"
                            >
                                {sending ? (
                                    <span className="btn-loading">
                                        <span className="spinner"></span>
                                        Enviando...
                                    </span>
                                ) : sent ? (
                                    <span>Mensaje enviado ✓</span>
                                ) : (
                                    <>
                                        <span>Enviar mensaje</span>
                                        <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
