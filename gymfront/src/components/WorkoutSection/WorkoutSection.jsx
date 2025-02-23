import React from "react";
import "./WorkoutSection.css";

const workoutData = [
  {
    img: "https://cdn-icons-png.flaticon.com/512/1041/1041886.png",
    title: "FREE FITNESS TRAINING",
    desc: "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/1785/1785220.png",
    title: "TONS OF CARDIO & STRENGTH",
    desc: "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/1970/1970955.png",
    title: "NO COMMITMENT MEMBERSHIPS",
    desc: "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.",
  },
];

function WorkoutSection() {
  return (
    <section className="workout_section">
      <h2>WORKOUT TRAINING WITH <span className="highlight">DAZKO</span></h2>
      <div className="workout_cards">
        {workoutData.map((item, index) => (
          <div key={index} className="workout_card">
            <img src={item.img} alt={item.title} className="workout_icon" />
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WorkoutSection;
