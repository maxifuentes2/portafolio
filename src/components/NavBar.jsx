import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import ButtonComponent from './ButtonComponent';

export default function NavBar({ darkMode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const logoSrc = darkMode ? '/logowhite.png' : '/logo.png';
    const menuIcon = darkMode ? '/hamburgerwhite.webp' : '/hamburger.webp'; 

    return (
        <header>
            <Link to="/">
                <img src={logoSrc} alt="Logo" className="pagelogo" />
            </Link>

            {/* Sidebar */}
            <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
                <NavLink to="/" onClick={toggleMenu}>
                    <ButtonComponent text="Inicio" />
                </NavLink>
                <NavLink to="/proyectos" onClick={toggleMenu}>
                    <ButtonComponent text="Proyectos" />
                </NavLink>
                <NavLink to="/contacto" onClick={toggleMenu}>
                    <ButtonComponent text="Contacto" />
                </NavLink>
            </div>
            <div className={`overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}></div>
            <img 
                src={menuIcon} 
                alt="Abrir menú" 
                className="sidebar-toggle" 
                onClick={toggleMenu} 
            />
        </header>
    );
}




