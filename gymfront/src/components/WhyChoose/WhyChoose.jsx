import React from "react";
import { FaAppleAlt, FaTshirt, FaDumbbell } from "react-icons/fa";
import "./WhyChoose.css";

const WhyChoose = () => {
  return (
    <section className="why_choose_us">
      <h2>Why Choose Us</h2>
      <div className="features_container">
        <div className="feature_box">
          <div className="feature_icon">
            <FaAppleAlt size={60} />
          </div>
          <h3>PROTEIN</h3>
          <p>
            High-quality protein supplements to boost your performance and recovery.
          </p>
        </div>
        <div className="feature_box">
          <div className="feature_icon">
            <FaTshirt size={60} />
          </div>
          <h3>SPORT CLOTHES</h3>
          <p>
            Modern and comfortable sportswear crafted for style and efficiency.
          </p>
        </div>
        <div className="feature_box">
          <div className="feature_icon">
            <FaDumbbell size={60} />
          </div>
          <h3>SPORT GEARS</h3>
          <p>
            Durable sports equipment to enhance your workout experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
