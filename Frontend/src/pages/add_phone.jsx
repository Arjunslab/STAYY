import API from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddPhone() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [Name, setName] = useState("");



  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(
        "/account/update-info",
        { phone, email, name: Name }
      );
      navigate("/account");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
        "Failed to update info"
      );
    }
  };
    return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl dark:text-white font-semibold mb-4">
            Update Information
        </h2>
        <p>if you dont wanna update somthing leave it blank</p>

        {error && (
            <p className="text-red-600 dark:text-red-400 mb-4">
            {error}
            </p>
        )}  
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter new phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />    


             
          <input
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          /> 
          <input
            type="text"
            placeholder="Enter name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          /> 



            <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
            Update information
            </button>
        </form>
      </div>
    </div>
  );
}