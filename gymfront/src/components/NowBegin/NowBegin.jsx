import React from "react";
import { Link } from "react-router-dom";
import "./NowBegin.css";

const NowBegin = () => {
  return (
    <section className="cta_section">
      <div className="cta_overlay">
        <h2>DON'T THINK, BEGIN TODAY!</h2>
        <p>
        Success starts with a single step. Push your limits, break your barriers, 
          and embrace the journey to a healthier, stronger you. Your future self 
          will thank you for the effort you put in today.
        </p>
        <Link to="/register" className="cta_button">
          BECOME A MEMBER
        </Link>
      </div>
    </section>
  );
};

export default NowBegin;
