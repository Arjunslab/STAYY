import { useEffect, useState } from "react";
import API from "../api/axios";

function Account() {
  const token = localStorage.getItem("token");

  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await API.get("/account");

        setAccountData(response.data);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.error ||
          "Failed to load account details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAccount();
    } else {
      setLoading(false);
      setError("You are not logged in.");
    }
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-100 dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Loading account...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <p className="text-red-600 dark:text-red-400">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Account Details
        </h1>

        <div className="flex justify-center mb-6">
          <img
            src={
              accountData.avatar ||
              "https://ui-avatars.com/api/?name=User"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full border"
          />
        </div>

        <div className="space-y-4">

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Name
            </p>
            <p className="text-lg text-gray-800 dark:text-white">
              {accountData.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Email
            </p>
            <p className="text-lg text-gray-800 dark:text-white break-all">
              {accountData.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Phone
            </p>

            {accountData.phone ? (
              <p className="text-lg text-gray-800 dark:text-white">
                {accountData.phone}
              </p>
            ) : (
              <p className="text-lg text-gray-800 dark:text-white">
                Not Provided {" "}
                <a
                  href="/account/update-info"
                  className="text-blue-600 dark:text-blue-400"
                >
                  Add Phone
                </a>
              </p>
                 )}

                <button className="mt-2 align-bottom justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => {
                    window.location.href = "/account/update-info";
                    }}>update info  </button>
           
          </div>

        </div>
      </div>
    </div>
  );
}

export default Account;