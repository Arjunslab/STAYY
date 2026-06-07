import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import API from "../api/axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post(
        "/auth/send-otp",
        {
          email,
        }
      );

      console.log(
        "SEND OTP RESPONSE:",
        res.data
      );

      alert(
        res.data.message ||
        "OTP sent successfully"
      );

      navigate("/verify-otp", {
        state: { email },
      });

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.error ||
        "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="glass-card w-[360px] p-8 rounded-2xl">

        <h1 className="text-2xl font-semibold text-white mb-2">
          Welcome to STAYY
        </h1>

        <p className="text-sm text-gray-400 mb-6">
          Enter your email to continue
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            type="email"
            placeholder="Email Address"
            className="input-glass"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="btn-primary mt-2"
            disabled={loading}
          >
            {loading
              ? "Sending OTP..."
              : "Continue"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-600"></div>
          <span className="mx-3 text-gray-400 text-sm">
            OR
          </span>
          <div className="flex-grow h-px bg-gray-600"></div>
        </div>

        <GoogleLogin
          onSuccess={async (
            credentialResponse
          ) => {
            try {
              const res =
                await API.post(
                  "/auth/google",
                  {
                    token:
                      credentialResponse.credential,
                  }
                );

              localStorage.setItem(
                "token",
                res.data.token
              );

              localStorage.setItem(
                "user",
                JSON.stringify(
                  res.data.user
                )
              );

              navigate("/dashboard");

            } catch (err) {
              console.error(err);

              alert(
                err.response?.data?.error ||
                "Google login failed"
              );
            }
          }}
          onError={() =>
            alert(
              "Google Login Failed"
            )
          }
        />

      </div>
    </div>
  );
}