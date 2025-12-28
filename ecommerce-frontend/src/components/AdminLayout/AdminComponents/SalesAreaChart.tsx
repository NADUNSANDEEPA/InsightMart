import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

interface DailySale {
  buying_date: string;
  quantity: number;
  rolling_avg: number;
}

interface Props {
  dailySales: DailySale[];
}

const SalesAreaChart = ({ dailySales }: Props) => {
  const labels = dailySales.map((d) =>
    new Date(d.buying_date).toLocaleDateString()
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Daily Sales Quantity",
        data: dailySales.map((d) => d.quantity),
        fill: true,
        backgroundColor: "rgba(0, 128, 0, 0.2)",
        borderColor: "green",
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: "green",
      },
      {
        label: "Rolling Average",
        data: dailySales.map((d) => d.rolling_avg),
        fill: true,
        backgroundColor: "rgba(255, 165, 0, 0.2)",
        borderColor: "orange",
        tension: 0.4,
        borderDash: [5, 5],
        borderWidth: 2,
        pointBackgroundColor: "orange",
      },
    ],
  };


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    interaction: {
      mode: "nearest" as const,
      intersect: false,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Quantity Sold",
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default SalesAreaChart;
