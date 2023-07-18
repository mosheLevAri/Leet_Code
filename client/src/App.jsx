import { Routes, Route } from "react-router-dom";
import React, {useState } from "react";
import { createContext} from 'react'
import SingIn from './Pages/SingIn/SingIn'
import Register from './Pages/Register/Register'
import Home from './Pages/Home/Home'
import Exercise from './components/ExerciseDetails'
import './index.css';




export const UserContext = createContext();



function App() {
  const [registeruser, setregisteruser] = useState()
  
  const [loginUser, setloginUser] = useState()
  const [token, setToken] = useState()



  return (
    <div className="app">

      <UserContext.Provider value={{ registeruser, setregisteruser, loginUser, setloginUser,token, setToken }}>
        <Routes>
          <Route path="/" element={<SingIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/exercise/:id" element={<Exercise />} />

          {/* <Route path="/exercise/:id" element={<Exercise />} />
          {loginUser?.promistion === "admin" ? <Route path="/admin" element={<Admin />} /> : <Route path="/admin" element={<Home />} />}
          {loginUser?.promistion === "admin" ? <Route path="/admin/exercise/:id" element={<AdminExercise />} /> : <Route path="/admin" element={<Home />} />}
        <Route path='*' element={<Error/>}/> */}
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
