"use client";
import { useEffect, useState } from "react";
import VisitorsChart from "./VisitorsChart";

interface TodayStats {
  totalVisits: number;
  uniqueVisits?: number;
}

interface DashboardStats {
  totalVisitors: number;
  uniqueVisitors: number;
  today: TodayStats;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [chartData, setChartData] = useState<
    { _id: string; visits: number }[]
  >([]);

  useEffect(() => {
    const key = localStorage.getItem("ADMIN_KEY");

    if (!key) {
      window.location.href = "/admin/login";
      return;
    }

    // ------ Fetch Dashboard Stats ------
    fetch("https://contact-project-h8qz.onrender.com/api/admin/stats", {
      headers: {
        Authorization: key,
      },
    })
      .then((res) => res.json())
      .then((data) => setStats(data));

    // ------ Fetch Chart Data ------
    fetch("https://contact-project-h8qz.onrender.com/api/analytics/chart")
      .then((res) => res.json())
      .then((data) => setChartData(data));
  }, []);

  if (!stats)
    return (
      <div className="h-screen flex justify-center items-center text-white text-2xl">
        Loading Dashboard...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* ---------- Stats Cards ---------- */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gray-800 p-5 rounded-xl shadow-md">
          <h2 className="text-lg opacity-80">Total Visitors</h2>
          <p className="text-4xl font-bold mt-1">{stats.totalVisitors}</p>
        </div>

        <div className="bg-gray-800 p-5 rounded-xl shadow-md">
          <h2 className="text-lg opacity-80">Unique Visitors</h2>
          <p className="text-4xl font-bold mt-1">{stats.uniqueVisitors}</p>
        </div>

        <div className="bg-gray-800 p-5 rounded-xl shadow-md">
          <h2 className="text-lg opacity-80">Today Visits</h2>
          <p className="text-4xl font-bold mt-1">
            {stats.today?.totalVisits ?? 0}
          </p>
        </div>
      </div>

      {/* ---------- Chart Section ---------- */}
      <VisitorsChart data={chartData} />
    </div>
  );
}
