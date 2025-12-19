"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [key, setKey] = useState("");
  const router = useRouter();

  const login = () => {
    if (!key) return alert("Enter Key");

    localStorage.setItem("ADMIN_KEY", key);
    router.push("/admin/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-xl shadow-xl w-96 text-center">
        <h1 className="text-white text-2xl font-bold mb-4">Admin Login</h1>
        <input
          type="password"
          className="p-2 w-full rounded mb-4"
          placeholder="Enter Admin Key"
          onChange={(e) => setKey(e.target.value)}
        />
        <button
          onClick={login}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
}
