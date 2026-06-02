import { useState, useEffect } from "react";

function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(localStorage.getItem("darkMode") === "dark");
  }, []);

  return (
    <div
      className={`flex flex-row h-screen ${
        darkMode ? "bg-gray-900" : "bg-blue-100"
      }`}
    >
      <p className="text-9xl text-gray-700 p-5 m-3">
        STAYY : your vacay our priority
      </p>
    </div>
  );
}

export default Home;