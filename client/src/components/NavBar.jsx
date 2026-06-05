import { useState, useEffect } from 'react';
import './NavBar.css';

const sections = [
    { id: "hero", label: "Inicio" },
    { id: "about", label: "Sobre mí" },
    { id: "projects", label: "Proyectos" },
    { id: "contact", label: "Contacto" },
];

export default function NavBar({ darkMode, setDarkMode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);
            const scrollPos = window.scrollY + 150;
            let current = "hero";
            for (const { id } of sections) {
                const el = document.getElementById(id);
                if (el && scrollPos >= el.offsetTop) current = id;
            }
            setActiveSection(current);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(false);
    };

    return (
        <>
            <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <button onClick={() => scrollTo("hero")} className="navbar-logo" aria-label="Ir al inicio">
                    <img src={darkMode ? "/logowhite.png" : "/logo.png"} alt="Logo" className="navbar-logo-img" />
                </button>

                <nav className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
                    {sections.map(({ id, label }) => (
                        <button
                            key={id}
                            onClick={() => scrollTo(id)}
                            className={`nav-link ${activeSection === id ? 'active' : ''}`}
                        >
                            {label}
                            {activeSection === id && <span className="nav-dot" />}
                        </button>
                    ))}
                </nav>

                <div className="navbar-right">
                    <button
                        className={`theme-btn ${darkMode ? 'dark' : 'light'}`}
                        onClick={() => setDarkMode(prev => !prev)}
                        aria-label="Cambiar tema"
                    >
                        <span className="theme-track">
                            <span className="theme-thumb" style={{ transform: darkMode ? 'translateX(18px)' : 'translateX(0)' }} />
                            <span className="theme-icon dark-icon">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="#8899aa"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                            </span>
                            <span className="theme-icon light-icon">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="#f5a623"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                            </span>
                        </span>
                    </button>

                    <button
                        className={`hamburger ${isMenuOpen ? 'open' : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Abrir menú"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </header>

            <div className={`overlay ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}></div>
        </>
    );
}
