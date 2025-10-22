import React, { useEffect, useRef } from "react";

export const ProductAnalytics = () => {
  const stockOutRef = useRef(null);
  const viewsPurchasesRef = useRef(null);
  const profitMarginRef = useRef(null);

  useEffect(() => {
    // Example: initialize charts here using refs
    // const stockOutChart = new Chart(stockOutRef.current, {...});
    // const viewsPurchasesChart = new Chart(viewsPurchasesRef.current, {...});
    // const profitMarginChart = new Chart(profitMarginRef.current, {...});

    // Cleanup function if needed
    return () => {
      // Destroy charts to prevent memory leaks
      // stockOutChart?.destroy();
      // viewsPurchasesChart?.destroy();
      // profitMarginChart?.destroy();
    };
  }, []);

  return (
    <div className="chart-container" style={{ marginBottom: 24 }}>
      <h3 className="chart-title">📦 Product Analytics</h3>
      <div
        className="charts-grid"
        style={{ gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}
      >
        <div>
          <h4
            style={{
              margin: "0 0 16px 0",
              color: "#4a5568",
              fontSize: 16,
            }}
          >
            Stock-Out Frequency
          </h4>
          <canvas
            ref={stockOutRef}
            id="stockOutFrequencyChart"
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
            Product Views vs Purchases
          </h4>
          <canvas
            ref={viewsPurchasesRef}
            id="viewsPurchasesChart"
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
            Profit Margin by Product
          </h4>
          <canvas
            ref={profitMarginRef}
            id="profitMarginChart"
            className="chart-canvas"
            style={{ maxHeight: 250 }}
          ></canvas>
        </div>
      </div>
    </div>
  );
};
