import React from "react";
import "./TrainerSection.css";

const trainers = [
  {
    name: "Patrick Cortez",
    role: "Leader",
    img: "https://preview.colorlib.com/theme/gutim/img/trainer/trainer-1.jpg.webp",
    description: `2nd at Europe. 5 year experience.`,
  },
  {
    name: "Gregory Powers",
    role: "Gym Coach",
    img: "https://preview.colorlib.com/theme/gutim/img/trainer/trainer-2.jpg.webp",
    description: `ifbb pro. 2 year experience`,
  },
  {
    name: "Walter Wagner",
    role: "Gym Coach",
    img: "https://preview.colorlib.com/theme/gutim/img/trainer/trainer-3.jpg.webp",
    description: `ifbb elite pro. 7 year experience`,
  },
];

const ExpertTrainers = () => {
  return (
    <section className="trainers_section">
      <h2 className="section_title">EXPERT TRAINERS</h2>
      <div className="trainers">
        {trainers.map((trainer, index) => (
          <div key={index} className="trainer_card">
            <img src={trainer.img} alt={trainer.name} className="trainer_img" />
            <h3 className="trainer_name">{trainer.name}</h3>
            <p className="trainer_role">{trainer.role}</p>
            <div className="hidden_content">
              <p className="trainer_desc">{trainer.description}</p>
              <div className="trainer_socials">
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-instagram"></i>
                <i className="fab fa-pinterest"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExpertTrainers;
