import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer({ darkMode }) {
    const githubLogoSrc = darkMode ? '/githublogowhite.png' : '/githublogo.png';
    const linkedinLogoSrc = darkMode ? '/linkedinlogowhite.png' : '/linkedinlogo.png';

    return (
        <footer className={darkMode ? 'dark-mode' : ''}>
            <Link to="https://github.com/maxifuentes2" target='_blank'>
                <img src={githubLogoSrc} alt="GitHub" className='footerlogo'/>
            </Link>
            <Link to="https://www.linkedin.com/in/máximo-fuentes-b74a092aa" target='_blank'>
                <img src={linkedinLogoSrc} alt="LinkedIn" className='footerlogo'/>
            </Link>
            <p>&copy; 2025 Máximo Fuentes</p>
        </footer>
    );
}




