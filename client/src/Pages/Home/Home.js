import "./style.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ExerciseCard from "../../components/ExerciseCard";
import WelcomeBanner from "../../components/WelcomeBanner";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .get("http://127.0.0.1:3000/exercises", { headers })
      .then((response) => setExercises(response.data))
      .catch((error) => {
        navigate("/");
      });
  }, [navigate]);


  const handleCardClick = (exerciseId) => {
    navigate(`/exercise/${exerciseId}`);
  };

  return (
    <div className="home-page">
      <WelcomeBanner />
      <div className="exercise-list">
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise._id} exercise={exercise} onClick={() => handleCardClick(exercise._id)}
          />
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
