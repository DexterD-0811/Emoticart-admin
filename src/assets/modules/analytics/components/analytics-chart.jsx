import React, { useState } from 'react';

export const AnalyticsCharts = () => {
  const [salesPeriod, setSalesPeriod] = useState('day');

  return (
    <div
      className="charts-grid"
      style={{ gridTemplateColumns: '2fr 1fr', marginBottom: 24 }}
    >
      {/* Sales Trends Chart */}
      <div className="chart-container">
        <h3 className="chart-title">Sales Trends</h3>
        <div style={{ marginBottom: 16 }}>
          <button
            className={`chart-period-btn ${salesPeriod === 'day' ? 'active' : ''}`}
            onClick={() => setSalesPeriod('day')}
          >
            Daily
          </button>
          <button
            className={`chart-period-btn ${salesPeriod === 'week' ? 'active' : ''}`}
            onClick={() => setSalesPeriod('week')}
          >
            Weekly
          </button>
          <button
            className={`chart-period-btn ${salesPeriod === 'month' ? 'active' : ''}`}
            onClick={() => setSalesPeriod('month')}
          >
            Monthly
          </button>
        </div>
        <canvas id="analyticsSalesChart" className="chart-canvas"></canvas>
      </div>

      {/* Customer Types Chart */}
      <div className="chart-container">
        <h3 className="chart-title">Customer Types</h3>
        <canvas id="customerTypesChart" className="chart-canvas"></canvas>
      </div>
    </div>
  );
};
