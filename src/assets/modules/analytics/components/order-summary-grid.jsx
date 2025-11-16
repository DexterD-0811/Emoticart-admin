import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export const OrderSummaryGrid = ({ ordersDelivered, ordersCancelled, completionRate, orders }) => {
  const aovChartRef = useRef(null);
  const growthChartRef = useRef(null);
  const aovInstance = useRef(null);
  const growthInstance = useRef(null);

  // === Prepare data for charts ===

  // Average Order Value Trend (group by day)
  const aovMap = {};
  orders.forEach(order => {
    const date = new Date(order.createdAt).toLocaleDateString();
    if (!aovMap[date]) aovMap[date] = { total: 0, count: 0 };
    aovMap[date].total += order.totalPrice || 0;
    aovMap[date].count += 1;
  });
  const avgOrderValueTrend = Object.entries(aovMap)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .map(([date, { total, count }]) => ({ label: date, value: (total / count).toFixed(2) }));

  // Monthly Order Growth (group by month)
  const growthMap = {};
  orders.forEach(order => {
    const month = new Date(order.createdAt).toLocaleString("default", { month: "short", year: "numeric" });
    growthMap[month] = (growthMap[month] || 0) + 1;
  });
  const monthlyOrderGrowth = Object.entries(growthMap)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .map(([month, value]) => ({ label: month, value }));

  // === Render charts ===
  useEffect(() => {
    if (aovInstance.current) aovInstance.current.destroy();
    if (growthInstance.current) growthInstance.current.destroy();

    if (aovChartRef.current) {
      aovInstance.current = new Chart(aovChartRef.current, {
        type: "line",
        data: {
          labels: avgOrderValueTrend.map(d => d.label),
          datasets: [{
            label: "Avg Order Value",
            data: avgOrderValueTrend.map(d => d.value),
            borderColor: "#48bb78",
            backgroundColor: "rgba(72,187,120,0.1)",
            tension: 0.4,
            fill: true,
          }]
        },
        options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
      });
    }

    if (growthChartRef.current) {
      growthInstance.current = new Chart(growthChartRef.current, {
        type: "bar",
        data: {
          labels: monthlyOrderGrowth.map(d => d.label),
          datasets: [{
            label: "Orders",
            data: monthlyOrderGrowth.map(d => d.value),
            backgroundColor: "#4299e1",
          }]
        },
        options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
      });
    }
  }, [orders]);

  return (
    <div
      className="charts-grid"
      style={{ gridTemplateColumns: "1fr 1fr 1fr", marginBottom: 24 }}
    >
      {/* Average Order Value Trend */}
      <div className="chart-container">
        <h4 className="chart-title">Average Order Value Trend</h4>
        <canvas id="aovTrendChart" ref={aovChartRef} className="chart-canvas"></canvas>
      </div>

      {/* Order Completion Rate */}
      <div className="chart-container">
        <h4 className="chart-title">Order Completion Rate</h4>
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <div
            id="completionRate"
            style={{
              fontSize: 48,
              fontWeight: "bold",
              color: "#48bb78",
              marginBottom: 8,
            }}
          >
            {`${completionRate}%`}
          </div>
          <div style={{ color: "#718096", marginBottom: 16 }}>
            Orders Successfully Delivered
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 14,
            }}
          >
            <div>
              <div
                id="deliveredCount"
                style={{ color: "#48bb78", fontWeight: 600 }}
              >
                {ordersDelivered}
              </div>
              <div style={{ color: "#718096" }}>Delivered</div>
            </div>
            <div>
              <div
                id="cancelledCount"
                style={{ color: "#f56565", fontWeight: 600 }}
              >
                {ordersCancelled}
              </div>
              <div style={{ color: "#718096" }}>Cancelled</div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Order Growth */}
      <div className="chart-container">
        <h4 className="chart-title">Monthly Order Growth</h4>
        <canvas id="orderGrowthChart" ref={growthChartRef} className="chart-canvas"></canvas>
      </div>
    </div>
  );
};
