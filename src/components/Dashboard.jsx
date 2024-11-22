import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentUser, setcurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setcurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      alert("Logout successful!");
    } catch (e) {
      console.error(e);
      setError(e.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header Section */}
      <header className="bg-blue-500 w-full py-6 shadow-md">
        <h1 className="text-white text-3xl font-semibold text-center">
          Welcome to the Dashboard
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center bg-white shadow-md rounded-lg mt-8 p-8 w-11/12 max-w-3xl">
        <div className="flex flex-col items-center">
          {/* User Avatar */}
          <img
            src={currentUser?.photoURL || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="h-32 w-32 rounded-full border-4 border-blue-500 shadow-lg"
          />
          {/* User Greeting */}
          <h2 className="text-2xl font-bold mt-4">
            {currentUser?.displayName || "Guest User"}
          </h2>
          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-center mt-2">{error}</p>
          )}
        </div>

        {/* User Details */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md w-full">
          <h3 className="text-lg font-semibold text-blue-500">Your Details</h3>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>
              <span className="font-medium">Name:</span>{" "}
              {currentUser?.displayName || "Not Available"}
            </li>
            <li>
              <span className="font-medium">Email:</span>{" "}
              {currentUser?.email || "Not Available"}
            </li>
            <li>
              <span className="font-medium">Phone Number:</span>{" "}
              {currentUser?.phoneNumber || "Not Provided"}
            </li>
          </ul>
        </div>

        {/* Logout Button */}
        <button
          className={`mt-8 w-full py-3 rounded-lg font-semibold text-white ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={handleSignOut}
          disabled={loading}
        >
          {loading ? "Logging Out..." : "Logout"}
        </button>
      </main>

      {/* Footer */}
      <footer className="mt-auto w-full py-4 bg-gray-800 text-center text-gray-300">
        <p>© 2024 My Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
