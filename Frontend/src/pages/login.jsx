import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      
      {/* Glass Card */}
      <div className="glass-card w-[350px] p-8 rounded-2xl">
        
        {/* Title */}
        <h1 className="text-2xl font-semibold text-white mb-6">
          Welcome back
        </h1>

        {/* Form */}
        <form className="flex flex-col gap-4">
          
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
            className="btn-primary mt-2"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-400 mt-6 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-yellow-400 hover:underline">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}