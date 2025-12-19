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

interface ChartProps {
  data: {
    _id: string;
    visits: number;
  }[];
}

export default function VisitorsChart({ data }: ChartProps) {
  const labels = data.map(item => item._id);
  const values = data.map(item => item.visits);

  return (
    <div className="bg-gray-800 p-6 rounded-xl mt-8">
      <h2 className="text-xl font-bold mb-4">Visitors Trend</h2>

      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Visits",
              data: values,
              borderColor: "#4ade80",
              backgroundColor: "rgba(74, 222, 128, 0.2)"
            }
          ]
        }}
        options={{
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }}
      />
    </div>
  );
}
