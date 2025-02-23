import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./NotFound.css";

export default function NotFound() {
    return (
        <div className="not_found_container">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="not_found_title"
                >
                    404
                </motion.h1>
                <p className="not_found_text">Oops! The page you're looking for doesn't exist.</p>
                <Link to="/" className="not_found_button">
                    Go Home
                </Link>
            </div>
    );
}
