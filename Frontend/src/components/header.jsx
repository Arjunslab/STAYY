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
    <div className="flex justify-between items-center bg-gray-800 px-6 py-4 text-white sticky top-0 z-50">
      
     
      <Link to="/" className="flex items-center gap-2">
        <h1 className="text-3xl font-bold tracking-wide">STAYY</h1>
      </Link>

     
      <nav className="flex items-center gap-8 text-lg">
        <Link to="/" className="hover:text-yellow-400">Home</Link>
        <Link to="/about" className="hover:text-yellow-400">About</Link>
        <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
      </nav>

      
      <div>
        {user ? (
          
         <div className="relative group">
  <img 
    onClick={() => window.location.href = "/account"}
    src={user.avatar}
    className="w-10 h-10 rounded-full cursor-pointer"
  />

  
  <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                  transition duration-200">
    
    <p className="px-4 py-2 text-sm text-gray-300">
      {user.name}
    </p>

    <button
      onClick={() => {
        localStorage.clear();
        window.location.href = "/login";
      }}
      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
    >
      Logout
    </button>
  </div>
</div>
        ) : (
          
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