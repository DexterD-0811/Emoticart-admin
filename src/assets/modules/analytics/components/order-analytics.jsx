import React from 'react';

export const OrderAnalytics = () => {
  return (
    <div className="chart-container" style={{ marginBottom: 24 }}>
      <h3 className="chart-title">📦 Order Analytics</h3>
      <div
        className="charts-grid"
        style={{ gridTemplateColumns: '2fr 1fr', gap: 20 }}
      >
        {/* Order Count Over Time */}
        <div>
          <h4
            style={{
              margin: '0 0 16px 0',
              color: '#4a5568',
              fontSize: 16,
            }}
          >
            Order Count Over Time
          </h4>
          <canvas
            id="orderCountChart"
            className="chart-canvas"
            style={{ maxHeight: 250 }}
          ></canvas>
        </div>

        {/* Order Status Distribution */}
        <div>
          <h4
            style={{
              margin: '0 0 16px 0',
              color: '#4a5568',
              fontSize: 16,
            }}
          >
            Order Status Distribution
          </h4>
          <canvas
            id="orderStatusChart"
            className="chart-canvas"
            style={{ maxHeight: 250 }}
          ></canvas>
        </div>
      </div>
    </div>
  );
};
