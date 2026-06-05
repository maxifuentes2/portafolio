import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Toast.css";

const ToastContext = createContext(null);

export function useToast() {
    return useContext(ToastContext);
}

let toastId = 0;

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = "info", duration = 4000) => {
        const id = ++toastId;
        setToasts((prev) => [...prev, { id, message, type, duration }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const toast = useCallback((message, type = "info", duration) => {
        addToast(message, type, duration);
    }, [addToast]);

    return (
        <ToastContext.Provider value={{ toast, addToast, removeToast }}>
            {children}
            <div className="toast-container">
                <AnimatePresence mode="popLayout">
                    {toasts.map((t) => (
                        <motion.div
                            key={t.id}
                            className={`toast toast-${t.type}`}
                            layout
                            initial={{ opacity: 0, y: -30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 28 }}
                        >
                            <span className="toast-icon">
                                {t.type === "success" ? "✓" : t.type === "error" ? "✕" : "ℹ"}
                            </span>
                            <span className="toast-message">{t.message}</span>
                            <button className="toast-close" onClick={() => removeToast(t.id)}>×</button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}
