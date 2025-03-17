import "./ThemeToggle.css";

export default function ThemeToggle({ setDarkMode }) {
    const handleToggle = () => {
        setDarkMode(prevMode => !prevMode);
    };

    return (
        <button className="theme-toggle" onClick={handleToggle}>
            {document.body.classList.contains("dark-mode") ? "☀️" : "🌙"}
        </button>
    );
}
