import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./ProjectModal.css";

export default function ProjectModal({ project, open, onClose }) {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    useEffect(() => {
        const handleKey = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    if (!project) return null;

    return createPortal(
        <AnimatePresence>
            {open && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="modal-content"
                        initial={{ opacity: 0, y: 40, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="modal-close" onClick={onClose}>×</button>
                        <div className="modal-header">
                            <span className="modal-badge">PROYECTO</span>
                            <h2 className="modal-title">{project.title}</h2>
                        </div>
                        <div className="modal-body">
                            {project.readme.map((section, i) => (
                                <div key={i} className="modal-section">
                                    {section.heading && (
                                        <h3 className="modal-section-heading">{section.heading}</h3>
                                    )}
                                    {section.text && (
                                        <p className="modal-text">{section.text}</p>
                                    )}
                                    {section.list && (
                                        <ul className="modal-list">
                                            {section.list.map((item, j) => (
                                                <li key={j}>{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                    {section.tags && (
                                        <div className="modal-tags">
                                            {section.tags.map((tag, j) => (
                                                <span key={j} className="modal-tag">{tag}</span>
                                            ))}
                                        </div>
                                    )}
                                    {section.columns && (
                                        <div className="modal-columns">
                                            {section.columns.map((col, j) => (
                                                <div key={j} className="modal-col">
                                                    <h4 className="modal-col-title">{col.title}</h4>
                                                    <ul className="modal-list">
                                                        {col.items.map((item, k) => (
                                                            <li key={k}>{item}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
