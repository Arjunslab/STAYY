import { Routes, Route } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Headerr from "./components/header";
import Home from "./components/home";
import About from "./components/about";
import Contact from "./components/contact";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Signup from "./pages/signup";
import "./App.css";
import axios from "axios";
import { useState } from "react";
function App() {
  const [usercity, setUserCity] = useState("Delhi");
  
  // axios.get(`http://localhost:5000/hotels?city=${usercity}`);
  

  const user_login = false; // Simulating user login status
  return (
    <>
      <Headerr  />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;