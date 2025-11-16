import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

export function ChartsGrid({ orders = [], products = [], salesPeriod = 'week' }) {
  const salesChartRef = useRef(null);
  const salesChartInstance = useRef(null);
  const categoryChartRef = useRef(null);
  const categoryChartInstance = useRef(null);

  const groupedOrders = () => {
    const grouped = {};
    orders.forEach(order => {
      const date = new Date(order.createdAt);
      let key;

      if (salesPeriod === 'day') key = date.toLocaleDateString();
      else if (salesPeriod === 'week') {
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toLocaleDateString();
      } else if (salesPeriod === 'month') {
        key = `${date.getMonth() + 1}/${date.getFullYear()}`;
      }

      grouped[key] = (grouped[key] || 0) + (order.totalPrice || 0);
    });
    return grouped;
  };

  const categoryCounts = () => {
    const counts = {};
    orders.forEach(order => {
      order.orderItems.forEach(item => {
        const product = products.find(p => p._id === item.product._id);
        if (!product?.category?.name) return;
        const categoryName = product.category.name;
        counts[categoryName] = (counts[categoryName] || 0) + item.quantity;
      });
    });
    return counts;
  };

  useEffect(() => {
    if (!orders.length) return;
    if (salesChartInstance.current) salesChartInstance.current.destroy();

    const grouped = groupedOrders();
    const ctx = salesChartRef.current.getContext('2d');

    salesChartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(grouped),
        datasets: [{
          label: 'Revenue ($)',
          data: Object.values(grouped),
          borderColor: '#48bb78',
          backgroundColor: 'rgba(72,187,120,0.2)',
          fill: true,
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true } },
      },
    });

    return () => salesChartInstance.current?.destroy();
  }, [orders, salesPeriod]);

  useEffect(() => {
    if (!orders.length || !products.length) return;
    if (categoryChartInstance.current) categoryChartInstance.current.destroy();

    const counts = categoryCounts();
    const ctx = categoryChartRef.current.getContext('2d');

    categoryChartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(counts),
        datasets: [{
          label: 'Orders by Category',
          data: Object.values(counts),
          backgroundColor: ['#4fd1c5', '#f6ad55', '#fc8181', '#90cdf4', '#f6e05e', '#a0aec0'],
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'right' } },
      },
    });

    return () => categoryChartInstance.current?.destroy();
  }, [orders, products]);

  return (
    <section className="charts-grid">
      <div className="chart-container" style={{ marginBottom: 24 }}>
        <h3 className="chart-title">Sales Trends</h3>
        <canvas ref={salesChartRef} className="chart-canvas"></canvas>
      </div>

      <div className="chart-container">
        <h3 className="chart-title">Orders by Category</h3>
        <canvas ref={categoryChartRef} className="chart-canvas"></canvas>
      </div>
    </section>
  );
}
