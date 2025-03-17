import { useLocation } from "react-router-dom";
import Home from "./Home.jsx";
import Projects from "./Projects.jsx";
import Contact from "./Contact.jsx";
import "./ItemListContainer.css";

export default function ItemListContainer() {
    const location = useLocation();

    const getContent = () => {
        switch (location.pathname) {
            case "/":
                return <Home />;
            case "/proyectos":
                return <Projects />;
            case "/contacto":
                return <Contact />;
            default:
                return <h2>Bienvenido</h2>;
        }
    };

    return <main className="item-list-container">{getContent()}</main>;
}
