"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [key, setKey] = useState("");

  const handleLogin = () => {
    if (!key) return alert("Enter Admin Key");

    localStorage.setItem("ADMIN_KEY", key);
    window.location.href = "/admin/dashboard";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 relative">
      
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-black to-gray-900 opacity-90 animate-pulse"></div>

      {/* Glow Effect */}
      <div className="absolute w-[600px] h-[600px] bg-red-700 blur-[200px] opacity-20"></div>

      {/* Card */}
      <div className="relative z-10 w-[400px] bg-gray-900/70 border border-gray-700 rounded-2xl shadow-[0_0_40px_rgba(255,0,0,.2)] p-8 backdrop-blur-md">
        
        <h1 className="text-3xl font-bold text-center mb-3 text-white">
          Admin Dashboard Login
        </h1>

        <p className="text-gray-400 text-center text-sm mb-6">
          Secure Access – Authorized Users Only
        </p>

        {/* Input */}
        <input
          type="password"
          placeholder="Enter Secure Admin Key"
          className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none border border-gray-700 focus:border-red-500 transition"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="mt-5 w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-3 rounded-lg shadow-lg"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-5">
          Your activity is monitored for security 🔐
        </p>
      </div>
    </div>
  );
}
