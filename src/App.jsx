import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import ItemListContainer from './components/ItemListContainer.jsx';
import Footer from './components/Footer.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import './App.css';
import './components/NavBar.css';
import './components/Footer.css';

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
            <div className="main-container">
                <NavBar darkMode={darkMode} />
                <Routes>
                    <Route path="/" element={<ItemListContainer />} />
                    <Route path="/proyectos" element={<ItemListContainer />} />
                    <Route path="/contacto" element={<ItemListContainer />} />
                    <Route path="*" element={<h2 className="error404">404 - Página no encontrada</h2>} />
                </Routes>
                <ThemeToggle setDarkMode={setDarkMode} />
            </div>
            <Footer darkMode={darkMode} />
        </div>
    );
}

export default App;
