

import React from "react";

const ExerciseCard = ({ exercise, onClick }) => {
  const { description, difficulty, category } = exercise;

  return (
    <div className="ExerciseCard" onClick={onClick}>
      <h3 className="exercise-description">{description}</h3>
      <div className="exercise-details">
        <h5 className="exercise-difficulty">Difficulty: {difficulty}</h5>
        <h5 className="exercise-category">Category: {category}</h5>
      </div>
    </div>
  );
};

export default ExerciseCard;