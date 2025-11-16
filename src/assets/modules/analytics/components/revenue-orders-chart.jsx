import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export const RevenueOrdersChart = ({ orders = [] }) => {
  const chartRef = useRef(null);
  let chartInstance = useRef(null);

  const labels = orders.map((_, index) => `Order ${index + 1}`);
  const revenueData = orders.map(order => order.totalPrice || 0);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Revenue ($)",
            data: revenueData,
            backgroundColor: "#48bb78",
          },
          {
            label: "Orders Count",
            data: orders.map(() => 1),
            type: "line",
            borderColor: "#3182ce",
            backgroundColor: "rgba(49,130,206,0.2)",
            yAxisID: "y1",
          },
        ],
      },
      options: {
        responsive: true,
        interaction: {
          mode: "index",
          intersect: false,
        },
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
            title: { display: true, text: "Revenue ($)" },
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            title: { display: true, text: "Orders Count" },
            grid: { drawOnChartArea: false },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [orders, revenueData, labels]);

  return (
    <div className="chart-container" style={{ marginBottom: 24 }}>
      <h3 className="chart-title">Revenue vs Orders Correlation</h3>
      <canvas ref={chartRef} className="chart-canvas"></canvas>
    </div>
  );
};
