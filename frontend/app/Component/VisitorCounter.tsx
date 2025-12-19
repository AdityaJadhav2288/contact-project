"use client";
import { useEffect } from "react";

export default function VisitorCounter() {
  useEffect(() => {
    fetch("http://localhost:5000/api/visit").catch(() => {});
  }, []);

  return null; // 👈 nothing visible
}
