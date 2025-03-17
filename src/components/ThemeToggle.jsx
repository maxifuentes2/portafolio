import "./ThemeToggle.css";

export default function ThemeToggle({ setDarkMode }) {
    const handleToggle = () => {
        setDarkMode(prevMode => !prevMode); // Alternar entre los temas
    };

    return (
        <button className="theme-toggle" onClick={handleToggle}>
            {/* Mostrar el ícono según el tema */}
            {document.body.classList.contains("dark-mode") ? "☀️" : "🌙"}
        </button>
    );
}
