"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

interface ChartItem {
  _id: string;
  visits: number;
}

interface ChartProps {
  data: ChartItem[];
}

export default function VisitorsChart({ data }: ChartProps) {
  const labels = data.map(item => item._id);
  const values = data.map(item => item.visits);

  return (
    <div className="mt-10 bg-gray-900/70 border border-gray-700 rounded-2xl p-6 shadow-[0_0_25px_rgba(0,255,255,.2)]">
      <h2 className="text-2xl font-bold text-white mb-4">
        Visitors Trend Analytics
      </h2>

      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Website Visits",
              data: values,
              borderColor: "rgba(0,255,255,0.9)",
              backgroundColor: "rgba(0,255,255,0.2)",
              pointBackgroundColor: "#00ffff",
              pointBorderColor: "#fff",
              tension: 0.4,
              borderWidth: 3,
              pointRadius: 5,
              fill: true
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: "white",
              },
            },
            tooltip: {
              backgroundColor: "#000",
              titleColor: "#00ffff",
              bodyColor: "white",
              borderColor: "#00ffff",
              borderWidth: 1,
            },
          },
          scales: {
            x: {
              ticks: { color: "white" },
              grid: { color: "rgba(255,255,255,0.1)" },
            },
            y: {
              ticks: { color: "white" },
              grid: { color: "rgba(255,255,255,0.1)" },
            },
          },
        }}
      />
    </div>
  );
}
