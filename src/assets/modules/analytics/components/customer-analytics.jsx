import React from "react";

export const CustomerAnalytics = () => {
  return (
    <div className="chart-container" style={{ marginBottom: 24 }}>
      <h3 className="chart-title">👥 Customer Analytics</h3>
      <div
        className="charts-grid"
        style={{ gridTemplateColumns: "2fr 1fr", gap: 20, display: "grid" }}
      >
        <div>
          <h4
            style={{
              margin: "0 0 16px 0",
              color: "#4a5568",
              fontSize: 16,
            }}
          >
            Customer Activity Status
          </h4>
          <canvas
            id="customerActivityChart"
            className="chart-canvas"
            style={{ maxHeight: 250 }}
          ></canvas>
        </div>
        <div>
          <h4
            style={{
              margin: "0 0 16px 0",
              color: "#4a5568",
              fontSize: 16,
            }}
          >
            Customer Lifetime Value Distribution
          </h4>
          <canvas
            id="customerLTVChart"
            className="chart-canvas"
            style={{ maxHeight: 250 }}
          ></canvas>
        </div>
      </div>
    </div>
  );
};