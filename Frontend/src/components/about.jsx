import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function About() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkMode(
        document.documentElement.classList.contains("dark")
      );
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
  <div
    className={`flex flex-col items-center justify-center h-screen px-8 text-center ${
      darkMode ? "bg-gray-900 text-white" : "bg-blue-100 text-gray-800"
    }`}
  >
    <h1 className="text-5xl font-bold mb-6">
      About STAYY
    </h1>

    <p className="max-w-3xl text-lg leading-relaxed">
      Welcome to <span className="font-semibold">STAYY</span>, where every
      journey begins with the perfect stay. Our mission is to help travelers
      discover comfortable, affordable, and memorable accommodations around
      the world.
    </p>

    <p className="max-w-3xl text-lg leading-relaxed mt-4">
      Whether you're planning a family vacation, a weekend getaway, or a
      business trip, STAYY makes finding the right place simple and
      stress-free. We focus on bringing together great destinations, trusted
      hosts, and a smooth booking experience.
    </p>

    <p className="max-w-3xl text-lg leading-relaxed mt-4">
      Because at STAYY, your vacation is our priority. 
    </p>
  </div>
);
}