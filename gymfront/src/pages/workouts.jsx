import React, { useState } from "react";

import "./workouts.css";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Herosection from "../components/hero/herosection";
import Footer from "../layout/footer";


function SortableItem({ exercise, index, onInputChange }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: exercise.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="exercise-card">

      <div className="drag-handle" {...attributes} {...listeners}>
        &#9776;
      </div>


      {exercise.img && (
        <img src={exercise.img} alt={exercise.name} className="exercise-image-left" />
      )}


      <div className="exercise-right">
        <div className="exercise-muscle">
          Targeted Muscle: {exercise.muscle}
        </div>
        <h3>{exercise.name}</h3>

        <div className="exercise-inputs">
          <input
            type="number"
            placeholder="Weight"
            value={exercise.weight || ""}
            onChange={(e) => onInputChange(index, "weight", e.target.value)}
          />
          <input
            type="number"
            placeholder="Sets"
            value={exercise.sets || ""}
            onChange={(e) => onInputChange(index, "sets", e.target.value)}
          />
          <input
            type="number"
            placeholder="Reps"
            value={exercise.reps || ""}
            onChange={(e) => onInputChange(index, "reps", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}


const strengthExercises = {
  chest: [
    { name: "Bench Press", img: "benchpress.jpg" },
    { name: "Dumbbell Fly", img: "fly.jpg" },
    { name: "Incline Bench Press", img: "incline.jpg" },
  ],
  back: [
    { name: "Lat Pulldown", img: "pulldown.jpg" },
    { name: "Bent-Over Row", img: "bentoverrow.jpg" },
    { name: "Deadlift", img: "deadlift.jpg" },
  ],
  shoulders: [
    { name: "Shoulder Press", img: "shoulderpress.jpg" },
    { name: "Lateral Raise", img: "lateralraise.jpg" },
    { name: "Face Pull", img: "facepull.jpg" },
  ],
  biceps: [
    { name: "Bicep Curl", img: "bicepcurl.jpg" },
    { name: "Hammer Curl", img: "hammercurl.jpg" },
    { name: "Preacher Curl", img: "preachercurl.jpg" },
  ],
  triceps: [
    { name: "Tricep Pushdown", img: "pushdown.jpg" },
    { name: "Skullcrusher", img: "skullcrusher.jpg" },
    { name: "Close-Grip Bench", img: "closegrip.jpg" },
  ],
  quads: [
    { name: "Squat", img: "squat.jpg" },
    { name: "Leg Extension", img: "legextension.jpg" },
    { name: "Lunge", img: "lunge.jpg" },
  ],
  hamstrings: [
    { name: "Romanian Deadlift", img: "rdl.jpg" },
    { name: "Leg Curl", img: "legcurl.jpg" },
    { name: "Glute Bridge", img: "glutebridge.jpg" },
  ],
  calves: [
    { name: "Standing Calf Raise", img: "calfraise.jpg" },
    { name: "Seated Calf Raise", img: "seatedcalf.jpg" },
    { name: "Donkey Calf Raise", img: "donkeycalf.jpg" },
  ],
};
const strengthSplits = {
  push: ["chest", "chest", "shoulders", "shoulders", "triceps", "triceps"],
  pull: ["back", "back", "shoulders", "biceps", "biceps"],
  legs: ["quads", "hamstrings", "calves"],
  upperBody: ["chest", "back", "shoulders", "biceps", "triceps"],
  lowerBody: ["quads", "hamstrings", "calves"],
  fullBody: [
    "chest",
    "back",
    "shoulders",
    "biceps",
    "triceps",
    "quads",
    "hamstrings",
    "calves",
  ],
};


export default function Workouts() {
  const [selectedProgram, setSelectedProgram] = useState("bmi");
  const [selectedSplit, setSelectedSplit] = useState(null);
  const [workout, setWorkout] = useState([]);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bench, setBench] = useState("");
  const [squat, setSquat] = useState("");
  const [deadlift, setDeadlift] = useState("");
  const [strengthRatio, setStrengthRatio] = useState(null);


  const handleProgramClick = (program) => {
    setSelectedProgram(program);
    setSelectedSplit(null);
    setWorkout([]);
  };

  const handleSplitSelection = (splitName) => {
    setSelectedSplit(splitName);
    generateStrengthWorkout(splitName);
  };


  const generateStrengthWorkout = (splitName) => {
    const muscleGroups = strengthSplits[splitName] || [];
    const newWorkout = muscleGroups.map((muscle, idx) => {
      const possible = strengthExercises[muscle] || [];
      const randomEx = possible[Math.floor(Math.random() * possible.length)];
      return {
        id: muscle + "-" + idx,
        name: randomEx.name,
        img: randomEx.img,
        muscle: muscle,
        weight: "",
        sets: "",
        reps: "",
      };
    });
    setWorkout(newWorkout);
  };


  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      setWorkout((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === active.id);
        const newIndex = prev.findIndex((item) => item.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const handleInputChange = (index, field, value) => {
    setWorkout((prev) => {
      const copy = [...prev];
      copy[index][field] = value;
      return copy;
    });
  };


  const calculateMetrics = () => {

    if (weight && height) {
      const w = parseFloat(weight);
      const h = parseFloat(height) / 100;
      const result = w / (h * h);
      setBmi(result.toFixed(2));
    }


    const bn = parseFloat(bench) || 0;
    const sq = parseFloat(squat) || 0;
    const dl = parseFloat(deadlift) || 0;
    const bw = parseFloat(weight) || 0;

    if (bw > 0) {
      const total = bn + sq + dl;
      const ratio = total / bw;
      setStrengthRatio(ratio.toFixed(2));
    }
  };

  return (
    <>
    
    <Herosection /><div className="programs-container">
      <h1>Explore Our Programs To Shape You</h1>


      <div className="programs-grid">

        <div className="program-card" onClick={() => handleProgramClick("strength")}>
          <i className="fas fa-dumbbell card-icon" />
          <h3>Strength Training</h3>
          <p>Train to improve your strength with multiple splits.</p>
        </div>


        <div className="program-card" onClick={() => handleProgramClick("bmi")}>
          <i className="fas fa-heartbeat card-icon" />
          <h3>BMI & Strength Calculator</h3>
          <p>Check your BMI and measure your lifts.</p>
        </div>
      </div>


      <div className="program-content">

        {selectedProgram === "strength" && (
          <div className="strength-section">
            <h2>Strength Training Splits</h2>
            <div className="split-buttons">
              <button onClick={() => handleSplitSelection("push")}>Push</button>
              <button onClick={() => handleSplitSelection("pull")}>Pull</button>
              <button onClick={() => handleSplitSelection("legs")}>Legs</button>
              <button onClick={() => handleSplitSelection("upperBody")}>Upper Body</button>
              <button onClick={() => handleSplitSelection("lowerBody")}>Lower Body</button>
              <button onClick={() => handleSplitSelection("fullBody")}>Full Body</button>
            </div>

            {selectedSplit && (
              <div className="workout-container">
                <h3>{selectedSplit.toUpperCase()} Workout</h3>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={workout.map((ex) => ex.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="exercises-list">
                      {workout.map((exercise, index) => (
                        <SortableItem
                          key={exercise.id}
                          exercise={exercise}
                          index={index}
                          onInputChange={handleInputChange} />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>
            )}
          </div>
        )}


        {selectedProgram === "bmi" && (
          <div className="fitness-calc">
            <h2>BMI & Strength Calculator</h2>

            <div className="input-row">
              <label>Body Weight (kg):</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)} />
            </div>
            <div className="input-row">
              <label>Height (cm):</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)} />
            </div>

            <div className="input-row">
              <label>Bench Press (kg):</label>
              <input
                type="number"
                value={bench}
                onChange={(e) => setBench(e.target.value)} />
            </div>
            <div className="input-row">
              <label>Squat (kg):</label>
              <input
                type="number"
                value={squat}
                onChange={(e) => setSquat(e.target.value)} />
            </div>
            <div className="input-row">
              <label>Deadlift (kg):</label>
              <input
                type="number"
                value={deadlift}
                onChange={(e) => setDeadlift(e.target.value)} />
            </div>

            <button className="calc-btn" onClick={calculateMetrics}>Calculate</button>

            {bmi && (
              <p className="result-text">
                Your BMI is: <strong>{bmi}</strong>
              </p>
            )}
            {strengthRatio && (
              <p className="result-text">
                Strength Ratio (Bench + Squat + Deadlift) / Bodyweight ={" "}
                <strong>{strengthRatio}</strong>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
}
