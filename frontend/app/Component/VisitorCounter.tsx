"use client";
import { useEffect } from "react";

export default function VisitorCounter() {
  useEffect(() => {
    fetch("https://contact-project-h8qz.onrender.com/api/visit")

  }, []);

  return null; // 👈 nothing visible
}
