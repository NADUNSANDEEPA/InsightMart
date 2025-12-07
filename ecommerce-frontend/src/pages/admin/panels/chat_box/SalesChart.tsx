import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register required ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface SalesChartProps {
  categories: string[];   
  todaySales: number[];    
}

const SalesChart: React.FC<SalesChartProps> = ({ categories, todaySales }) => {
  const data = {
    labels: categories,
    datasets: [
      {
        label: "Today's Sales",
        data: todaySales,
        backgroundColor: "rgba(200, 12, 12, 0.5)",
        borderColor: "rgba(200, 12, 12, 0.8)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" as const },
      title: {
        display: true,
        text: "Sales by Category Today",
        font: { size: 18 },
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Today Sell",
        },
      },
      x: {
        title: {
          display: true,
          text: "Categories",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default SalesChart;
