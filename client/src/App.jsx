import { useState, useEffect } from 'react';
import NavBar from './components/NavBar.jsx';
import HeroSection from './components/HeroSection.jsx';
import AboutSection from './components/AboutSection.jsx';
import ProjectsSection from './components/Projects.jsx';
import ContactSection from './components/Contact.jsx';
import TechParallax from './components/TechParallax.jsx';
import Footer from './components/Footer.jsx';
import './App.css';

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
            <TechParallax darkMode={darkMode} />
            <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
            <main className="main-content">
                <HeroSection />
                <AboutSection />
                <ProjectsSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
}

export default App;
