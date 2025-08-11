import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white/70 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-purple-200/50 space-y-8">
          <div className="flex items-center space-x-3 justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-gray-800">ThoughtAlchemy</h1>
          </div>

          {error && <div className="text-red-600 font-semibold text-center">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-purple-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-purple-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-yellow-400 text-white font-semibold rounded-xl py-3 shadow-lg hover:from-purple-600 hover:to-yellow-500 transition-transform duration-300 transform hover:-translate-y-1"
            >
              Log In
            </button>
          </form>

          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-purple-600 font-semibold hover:underline">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
