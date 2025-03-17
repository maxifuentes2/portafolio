import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ title, description, linkText, linkTo, imgSrc, isExternal = false }) {
    return (
        <div className="card">
            {imgSrc && (
                <Link to={linkTo}>
                    <img src={imgSrc} alt={title} className="card-image" />
                </Link>

            )}
            <h3>{title}</h3>
            <p>{description}</p>
            {isExternal ? (
                <a
                    href={linkTo}
                    className="card-link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {linkText}
                </a>
            ) : (
                <Link to={linkTo} className="card-link">
                    {linkText}
                </Link>
            )}
        </div>
    );
}