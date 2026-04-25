import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import API from "../api/axios";
export default function Signup() {
  
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/signup", {
      name,
      email,
      password,
    });

    console.log(res.data);

    // Save user + token
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    // redirect
    window.location.href = "/";
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      
      {/* Glass Card */}
      <div className="glass-card w-[350px] p-8 rounded-2xl">
        
        {/* Title */}
        <h1 className="text-2xl font-semibold text-white mb-2">
          Create account
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          Start your journey with Stayy
        </p>

        {/* Form */}
        <form className="flex flex-col gap-4">
          
          <input
            type="text"
            placeholder="Full Name"
            className="input-glass"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="input-glass"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="input-glass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            onClick={handleSubmit}
            className="btn-primary mt-2"
          >
            Sign up
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-400 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );


  
}