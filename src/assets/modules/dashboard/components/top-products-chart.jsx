import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { ChartContainer } from './chart-container';

export function TopProductsChart({ orders = [], products = [] }) {
  const chartRef = useRef(null);
  const chartId = 'top-products-chart';

  const computeTopProducts = () => {
    const counts = {};
    orders.forEach(order => {
      order.orderItems.forEach(item => {
        const productId = item.product?._id || item.product;
        const productObj = products.find(p => p._id === productId);
        const name = productObj?.name || item.name || 'Unknown';
        counts[name] = (counts[name] || 0) + item.quantity;
      });
    });
    return Object.entries(counts).sort(([, a], [, b]) => b - a).slice(0, 5);
  };

  useEffect(() => {
    const canvas = document.getElementById(chartId);
    if (!canvas) return;

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const ctx = canvas.getContext('2d');
    const topProducts = computeTopProducts();
    const labels = topProducts.map(([name]) => name);
    const data = topProducts.map(([, qty]) => qty);
    const colors = ['#4fd1c5', '#f6ad55', '#fc8181', '#90cdf4', '#f6e05e'].slice(0, data.length);

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Quantity Sold',
            data,
            backgroundColor: colors
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { display: false } }
      }
    });
  }, [orders, products]);

  return <ChartContainer title="Top Products" chartId={chartId} />;
}
