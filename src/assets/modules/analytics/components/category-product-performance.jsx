import React from "react";

export const CategoryProductPerformance = () => {
  return (
    <div className="chart-container" style={{ marginBottom: 24 }}>
      <h3 className="chart-title">📊 Category & Product Performance</h3>
      <div
        className="charts-grid"
        style={{ gridTemplateColumns: "1fr 1fr", gap: 20 }}
      >
        <div>
          <h4
            style={{
              margin: "0 0 16px 0",
              color: "#4a5568",
              fontSize: 16,
            }}
          >
            Top Categories by Revenue
          </h4>
          <canvas
            id="topCategoriesChart"
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
            Product Performance
          </h4>
          <canvas
            id="productPerformanceChart"
            className="chart-canvas"
            style={{ maxHeight: 250 }}
          ></canvas>
        </div>
      </div>
    </div>
  );
};
