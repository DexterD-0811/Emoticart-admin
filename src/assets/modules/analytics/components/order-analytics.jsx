import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export const OrderAnalytics = ({ orders = [] }) => {
  const orderCountRef = useRef(null);
  const orderStatusRef = useRef(null);
  const orderCountInstance = useRef(null);
  const orderStatusInstance = useRef(null);

  useEffect(() => {
    if (!orders.length) return;

    const dateCounts = {};
    orders.forEach((order) => {
      const date = new Date(order.createdAt).toLocaleDateString();
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });
    const sortedDates = Object.keys(dateCounts).sort(
      (a, b) => new Date(a) - new Date(b)
    );
    const orderCounts = sortedDates.map((date) => dateCounts[date]);

    if (orderCountRef.current) {
      if (orderCountInstance.current) orderCountInstance.current.destroy();

      orderCountInstance.current = new Chart(orderCountRef.current, {
        type: "line",
        data: {
          labels: sortedDates,
          datasets: [
            {
              label: "Orders",
              data: orderCounts,
              borderColor: "#3182ce",
              backgroundColor: "rgba(49,130,206,0.2)",
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
        },
      });
    }

    const statusLabels = ["Delivered", "Cancelled", "Processing", "Pending"];
    const statusCounts = statusLabels.map(
      (status) => orders.filter((order) => order.status === status).length
    );

    if (orderStatusRef.current) {
      if (orderStatusInstance.current) orderStatusInstance.current.destroy();

      orderStatusInstance.current = new Chart(orderStatusRef.current, {
        type: "pie",
        data: {
          labels: statusLabels,
          datasets: [
            {
              data: statusCounts,
              backgroundColor: ["#48bb78", "#f56565", "#4299e1", "#ecc94b"],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { position: "bottom" } },
        },
      });
    }
  }, [orders]);

  return (
    <div className="chart-container" style={{ marginBottom: 24 }}>
      <h3 className="chart-title">📦 Order Analytics</h3>
      <div
        className="charts-grid"
        style={{ gridTemplateColumns: "2fr 1fr", gap: 20 }}
      >
        <div>
          <h4 style={{ margin: "0 0 16px 0", color: "#4a5568", fontSize: 16 }}>
            Order Count Over Time
          </h4>
          <canvas
            className="chart-canvas"
            style={{ maxHeight: 250 }}
            ref={orderCountRef}
          ></canvas>
        </div>
        <div>
          <h4 style={{ margin: "0 0 16px 0", color: "#4a5568", fontSize: 16 }}>
            Order Status Distribution
          </h4>
          <canvas
            className="chart-canvas"
            style={{ maxHeight: 250 }}
            ref={orderStatusRef}
          ></canvas>
        </div>
      </div>
    </div>
  );
};
