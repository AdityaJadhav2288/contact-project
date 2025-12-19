"use client";

import { useEffect } from "react";
import VisitorCounter from "./Component/VisitorCounter";

export default function Home() {
  useEffect(() => {
    // slight screen shake when user moves mouse
    const handleMove = () => {
      document.body.classList.add("horror-shake");
      setTimeout(() => document.body.classList.remove("horror-shake"), 150);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <main className="min-h-screen bg-black text-red-500 flex items-center justify-center relative overflow-hidden">

      {/* Hidden Visitor Tracker */}
      <div className="hidden">
        <VisitorCounter />
      </div>

      {/* Horror Fog Layer */}
      <div className="absolute w-full h-full fog"></div>

      {/* Thunder Flash */}
      <div className="absolute inset-0 flash-overlay"></div>

      {/* Red Horror Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-red-900/40 to-black blur-2xl"></div>

      {/* Blinking Eye */}
      <div className="absolute top-16 right-20 text-5xl animate-eye">👁️</div>

      {/* Main Content */}
      <div className="z-10 text-center">
        <h1 className="text-6xl md:text-8xl font-bold tracking-widest drop-shadow-2xl text-red-600 animate-flicker">
          YOU SHOULDNT HAVE CLICKED...
        </h1>

        <p className="mt-6 text-2xl text-red-400 animate-shake">
          Your presence has been detected 👁️
        </p>

        <p className="mt-3 text-lg text-gray-300 animate-pulse">
          and your data has been collected successfully…
        </p>

        <p className="mt-8 text-red-700 text-3xl font-bold animate-heartbeat">
          Now… there is no way back…
        </p>
      </div>
    </main>
  );
}
