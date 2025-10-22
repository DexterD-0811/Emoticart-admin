import React from 'react';

export const OrderSummaryGrid = () => {
  return (
    <div
      className="charts-grid"
      style={{ gridTemplateColumns: '1fr 1fr 1fr', marginBottom: 24 }}
    >
      {/* Average Order Value Trend */}
      <div className="chart-container">
        <h4 className="chart-title">Average Order Value Trend</h4>
        <canvas id="aovTrendChart" className="chart-canvas"></canvas>
      </div>

      {/* Order Completion Rate */}
      <div className="chart-container">
        <h4 className="chart-title">Order Completion Rate</h4>
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div
            id="completionRate"
            style={{
              fontSize: 48,
              fontWeight: 'bold',
              color: '#48bb78',
              marginBottom: 8,
            }}
          >
            87.3%
          </div>
          <div style={{ color: '#718096', marginBottom: 16 }}>
            Orders Successfully Delivered
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 14,
            }}
          >
            <div>
              <div
                id="deliveredCount"
                style={{ color: '#48bb78', fontWeight: 600 }}
              >
                524
              </div>
              <div style={{ color: '#718096' }}>Delivered</div>
            </div>
            <div>
              <div
                id="cancelledCount"
                style={{ color: '#f56565', fontWeight: 600 }}
              >
                78
              </div>
              <div style={{ color: '#718096' }}>Cancelled</div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Order Growth */}
      <div className="chart-container">
        <h4 className="chart-title">Monthly Order Growth</h4>
        <canvas id="orderGrowthChart" className="chart-canvas"></canvas>
      </div>
    </div>
  );
};
