import "./DeliveryPerformance.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Mock data
const data = {
  labels: ["Electronics", "Furniture", "Clothing", "Books", "Toys", "Groceries"],
  datasets: [
    {
      label: "Shipments",
      data: [240, 180, 150, 120, 90, 75],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

// Chart options with horizontal orientation
const options = {
  indexAxis: "y" as const, // <-- this makes it horizontal
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false, text: "Top Product Shipments (Horizontal Bar)" },
  },
  scales: {
    x: {
      beginAtZero: true,
    },
  },
};

export const DeliveryPerformance = () => {
  return (
    <div className="del-perf d-flex flex-column justify-content-center gap-2">
        <div><h6>Top Shipments (Yearly)</h6></div>
        <Bar data={data} options={options} />
    </div>
  );
};
