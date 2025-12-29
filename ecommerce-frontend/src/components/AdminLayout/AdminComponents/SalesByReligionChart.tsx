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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ReligionSalesData {
  product_name: string;
  sales_by_religion: Record<string, number>;
  total_quantity: number;
}

interface Props {
  data: ReligionSalesData[];
}

// Elegant color palette
const elegantColors = [
  "#4E79A7", // blue
  "#F28E2B", // orange
  "#E15759", // red
  "#76B7B2", // teal
  "#59A14F", // green
  "#EDC948", // yellow
  "#B07AA1", // purple
  "#FF9DA7", // pink
  "#9C755F", // brown
  "#BAB0AC", // grey
];

export const SalesByReligionChart: React.FC<Props> = ({ data }) => {
  const religions = Object.keys(data[0]?.sales_by_religion || {});

  const datasets = religions.map((religion, idx) => ({
    label: religion,
    data: data.map((product) => product.sales_by_religion[religion] || 0),
    backgroundColor: elegantColors[idx % elegantColors.length],
  }));

  const chartData = {
    labels: data.map((product) => product.product_name),
    datasets: datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "" },
      tooltip: { mode: "index" as const, intersect: false },
    },
    interaction: { mode: "nearest" as const, intersect: false },
    scales: {
      x: { stacked: true, title: { display: true, text: "Products" } },
      y: { stacked: true, title: { display: true, text: "Quantity Sold" }, beginAtZero: true },
    },
  };

  return (
      <Bar data={chartData} options={options} />
  );
};

