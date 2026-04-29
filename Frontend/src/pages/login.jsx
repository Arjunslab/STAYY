import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import API from "../api/axios";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isLogin ? "/login" : "/signup";
      
      const payload = isLogin
        ? { email, password }
        : { name, email, password };

      const res = await API.post(url, payload);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">

      <div className="glass-card w-[360px] p-8 rounded-2xl">

        {/* Toggle */}
        <div className="flex mb-6 bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-lg text-sm ${
              isLogin ? "bg-yellow-400 text-black" : "text-gray-400"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-lg text-sm ${
              !isLogin ? "bg-yellow-400 text-black" : "text-gray-400"
            }`}
          >
            Signup
          </button>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-white mb-2">
          {isLogin ? "Welcome back" : "Create account"}
        </h1>

        <p className="text-sm text-gray-400 mb-6">
          {isLogin
            ? "Login to continue"
            : "Start your journey with Stayy"}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="input-glass"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

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

          <button type="submit" className="btn-primary mt-2">
            {isLogin ? "Login" : "Sign up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-600"></div>
          <span className="mx-3 text-gray-400 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-600"></div>
        </div>

        {/* Google Login */}
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            const res = await API.post("/auth/google", {
              token: credentialResponse.credential,
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            navigate("/dashboard");
          }}
          onError={() => console.log("Google Login Failed")}
        />

      </div>
    </div>
  );
}