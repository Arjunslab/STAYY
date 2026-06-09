import { Routes, Route, useNavigate } from "react-router-dom";
import Headerr from "./components/header";
import Home from "./components/home";
import About from "./components/about";
import Contact from "./components/contact";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Fourzerofour from "./pages/404";
import "./App.css";
import SplashCursor from './components/SplashCursor'
import { useState, useEffect } from "react";
import VerifyOtp from "./pages/Verifyotp";
import Account from "./pages/account";
import AddPhone from "./pages/add_phone";

 
function App() {
  
  return (
    <>
    
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING
        RAINBOW_MODE={false}
        COLOR="#7e70d6ff"
      />
   
      <Headerr  />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/update-info" element={<AddPhone />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="*" element={<Fourzerofour />} />  


      </Routes>
    </>
     );
   
 
}

export default App;