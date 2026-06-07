import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const verifyOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      console.log("VERIFY RESPONSE:", res.data);

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/dashboard");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.error ||
        "Verification failed"
      );
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="glass-card w-[360px] p-8 rounded-2xl text-center">
          <h1 className="text-xl text-white mb-4">
            Invalid Session
          </h1>

          <p className="text-gray-400 mb-4">
            No email found. Please start again.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="btn-primary"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="glass-card w-[360px] p-8 rounded-2xl">

        <h1 className="text-2xl font-semibold text-white mb-2">
          Verify OTP
        </h1>

        <p className="text-sm text-gray-400 mb-6">
          Enter the OTP sent to
          <br />
          {email}
        </p>

        <form
          onSubmit={verifyOtp}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="6 Digit OTP"
            className="input-glass"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value)
            }
            maxLength={6}
            required
          />

          <button
            type="submit"
            className="btn-primary"
          >
            Verify OTP
          </button>
        </form>

      </div>
    </div>
  );
}