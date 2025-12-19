"use client";
import { useEffect, useState } from "react";
import VisitorsChart from "./VisitorsChart";

interface TodayStats {
  totalVisits: number;
}

interface DashboardStats {
  totalVisitors: number;
  uniqueVisitors: number;
  today: TodayStats;
}

interface ChartItem {
  _id: string;
  visits: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [chartData, setChartData] = useState<ChartItem[]>([]);

  useEffect(() => {
    const key = localStorage.getItem("ADMIN_KEY");

    if (!key) {
      window.location.href = "/admin/login";
      return;
    }

    // Fetch Stats
    fetch("https://contact-project-h8qz.onrender.com/api/admin/stats", {
      headers: { Authorization: key },
    })
      .then((res) => res.json())
      .then((data: DashboardStats) => setStats(data))
      .catch(() => console.log("Failed to load stats"));

    // Fetch Chart Data
    fetch("https://contact-project-h8qz.onrender.com/api/analytics/chart")
      .then((res) => res.json())
      .then((data: ChartItem[]) => setChartData(data))
      .catch(() => console.log("Chart Failed"));
  }, []);

  if (!stats)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-950 text-white text-2xl">
        Loading Dashboard...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-wide">
          Admin Analytics Dashboard
        </h1>

        <button
          onClick={() => {
            localStorage.removeItem("ADMIN_KEY");
            window.location.href = "/admin/login";
          }}
          className="px-5 py-2 bg-red-600 hover:bg-red-700 transition rounded-lg shadow"
        >
          Logout
        </button>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-3 gap-8">

        <div className="p-6 rounded-2xl bg-gray-900/70 border border-gray-700 shadow-[0_0_25px_rgba(255,0,0,.2)] hover:scale-105 transition">
          <h2 className="text-lg text-gray-300">Total Visitors</h2>
          <p className="text-4xl mt-2 font-bold text-red-500">{stats.totalVisitors}</p>
          <p className="text-gray-500 mt-2">All time website visits</p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-900/70 border border-gray-700 shadow-[0_0_25px_rgba(0,255,255,.2)] hover:scale-105 transition">
          <h2 className="text-lg text-gray-300">Unique Visitors</h2>
          <p className="text-4xl mt-2 font-bold text-cyan-400">{stats.uniqueVisitors}</p>
          <p className="text-gray-500 mt-2">Unique individuals detected</p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-900/70 border border-gray-700 shadow-[0_0_25px_rgba(0,255,0,.2)] hover:scale-105 transition">
          <h2 className="text-lg text-gray-300">Today Visits</h2>
          <p className="text-4xl mt-2 font-bold text-green-400">
            {stats.today?.totalVisits ?? 0}
          </p>
          <p className="text-gray-500 mt-2">Visits in last 24 hours</p>
        </div>
      </div>

      {/* ⬇️ CHART ADDED HERE ⬇️ */}
      <VisitorsChart data={chartData} />

      {/* FOOTER */}
      <div className="mt-10 text-gray-500 text-center">
        Monitoring website activity • Secure Admin Panel 🔐
      </div>
    </div>
  );
}
