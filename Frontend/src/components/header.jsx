import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

function Headerr() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="flex justify-between items-center bg-gray-800 px-6 py-4 text-white">
      
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <h1 className="text-3xl font-bold tracking-wide">STAYY</h1>
      </Link>

      {/* Navigation */}
      <nav className="flex items-center gap-8 text-lg">
        <Link to="/" className="hover:text-yellow-400">Home</Link>
        <Link to="/about" className="hover:text-yellow-400">About</Link>
        <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
      </nav>

      {/* Right Side */}
      <div>
        {user ? (
          // ✅ Logged in → show profile pic
          <img
            src={user.avatar}
            alt="profile"
            className="w-10 h-10 rounded-full border-2 border-yellow-400"
          />
        ) : (
          // ❌ Not logged in → show login button
          <Link
            to="/login"
            className="flex items-center gap-2 bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            <FontAwesomeIcon icon={faRightToBracket} />
            <span>Login</span>
          </Link>
        )}
      </div>

    </div>
  );
}

export default Headerr;