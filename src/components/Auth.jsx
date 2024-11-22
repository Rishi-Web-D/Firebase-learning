import React, { useState } from "react";
import { auth, googleAuthProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup  } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered successfully:", response);
      navigate("/dashboard")
    } catch (e) {
      console.error(e);
      setError(e.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithGoogle = async () => {
    setLoading(true);
    try {
      const response = await signInWithPopup(auth, googleAuthProvider);
      console.log(response);
      navigate("/dashboard")
    } catch (error) {
      console.error(error);
      setError(e.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-gray-900 text-white px-4">
      <div className="w-full max-w-sm bg-gray-800 rounded-lg p-6 shadow-md">
        <div>
          <h1 className="text-2xl font-semibold mb-6 text-center">Sign Up</h1>
        </div>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              className="w-full px-3 py-2 border text-black border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              id="password"
              className="w-full px-3 py-2 border border-gray-700 text-black rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded text-white ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded text-white mt-5 ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={handleSignInWithGoogle}
        >
          {loading ? "Signing up..." : "Sign in with Google"}
        </button>        
      </div>
    </div>
  );
};

export default Auth;
