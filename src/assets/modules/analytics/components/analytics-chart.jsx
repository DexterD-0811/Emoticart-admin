import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export const AnalyticsCharts = ({ orders = [] }) => {
  const [salesPeriod, setSalesPeriod] = useState('day');
  const salesChartRef = useRef(null);
  const salesChartInstance = useRef(null);

  const groupOrders = () => {
    const grouped = {};
    orders.forEach(order => {
      const date = new Date(order.createdAt);
      let key;
      if (salesPeriod === 'day') key = date.toLocaleDateString();
      else if (salesPeriod === 'week') {
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toLocaleDateString();
      } else if (salesPeriod === 'month') key = `${date.getMonth() + 1}/${date.getFullYear()}`;
      grouped[key] = (grouped[key] || 0) + (order.totalPrice || 0);
    });
    return grouped;
  };

  useEffect(() => {
    if (salesChartInstance.current) salesChartInstance.current.destroy();

    const groupedOrders = groupOrders();
    const labels = Object.keys(groupedOrders);
    const data = Object.values(groupedOrders);

    const ctx = salesChartRef.current.getContext('2d');
    salesChartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Revenue ($)',
            data,
            borderColor: '#48bb78',
            backgroundColor: 'rgba(72,187,120,0.2)',
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true } },
      },
    });

    return () => salesChartInstance.current?.destroy();
  }, [orders, salesPeriod]);

  return (
    <div className="chart-container" style={{ marginBottom: 24 }}>
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
      <canvas ref={salesChartRef} className="chart-canvas"></canvas>
    </div>
  );
};
