import React from "react";
import "./proqrams.css";

const Programs = () => {
  const plans = [
    {
      name: "BASIC PLAN",
      price: "$25",
      benefits: [
        "12 entry fee",
        "Free consultation to coaches",
        "Access to The Sauna",
      ],
      icon: "❤️",
    },
    {
      name: "PREMIUM PLAN",
      price: "$30",
      benefits: [
        "16 entry fee",
        "Free consultation to Coaches",
        "Access to minibar and Sauna",
      ],
      icon: "👑",
    },
    {
      name: "PRO PLAN",
      price: "$45",
      benefits: [
        "limitless entry fee",
        "Consultation of Private Coach",
        "Access to Swimming Pool",
      ],
      icon: "🏋️",
    },
  ];

  return (
    <section className="programs">
      <h2 className="title">
        READY TO START <span>YOUR JOURNEY</span> NOW WITH US
      </h2>
      <div className="plans_container">
        {plans.map((plan, index) => (
          <div key={index} className="plan">
            <div className="plan_icon">{plan.icon}</div>
            <h3 className="plan_name">{plan.name}</h3>
            <p className="plan_price">{plan.price}</p>
            <ul className="plan_benefits">
              {plan.benefits.map((benefit, i) => (
                <li key={i}>✔ {benefit}</li>
              ))}
            </ul>
            <button className="join_btn">Join now</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Programs;
