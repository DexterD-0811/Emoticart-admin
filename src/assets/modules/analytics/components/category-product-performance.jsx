import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export const CategoryProductPerformance = ({ orders, products }) => {
  const topCategoriesRef = useRef(null);
  const productPerformanceRef = useRef(null);

  useEffect(() => {
    if (!orders.length || !products.length) return;

    const categoryRevenue = {};
    orders.forEach(order => {
      order.orderItems.forEach(item => {
        const productData = products.find(p => p._id === item.product._id);
        const category = productData?.category?.name || "Unknown";
        categoryRevenue[category] = (categoryRevenue[category] || 0) + item.price * item.quantity;
      });
    });

    const topCategories = Object.entries(categoryRevenue)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const categoryChartData = {
      labels: topCategories.map(c => c[0]),
      datasets: [{
        label: "Revenue",
        data: topCategories.map(c => c[1]),
        backgroundColor: ["#4fd1c5", "#ed8936", "#48bb78"],
      }],
    };

    if (topCategoriesRef.current?.chart) topCategoriesRef.current.chart.destroy();
    topCategoriesRef.current.chart = new Chart(topCategoriesRef.current, {
      type: "bar",
      data: categoryChartData,
      options: { responsive: true },
    });

    const productRevenue = {};
    orders.forEach(order => {
      order.orderItems.forEach(item => {
        productRevenue[item.product.name] = (productRevenue[item.product.name] || 0) + item.price * item.quantity;
      });
    });

    const topProducts = Object.entries(productRevenue)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const productChartData = {
      labels: topProducts.map(p => p[0]),
      datasets: [{
        label: "Revenue",
        data: topProducts.map(p => p[1]),
        backgroundColor: ["#4fd1c5", "#ed8936", "#48bb78"],
      }],
    };

    if (productPerformanceRef.current?.chart) productPerformanceRef.current.chart.destroy();
    productPerformanceRef.current.chart = new Chart(productPerformanceRef.current, {
      type: "bar",
      data: productChartData,
      options: { responsive: true },
    });
  }, [orders, products]);

  return (
    <div className="chart-container" style={{ marginBottom: 24 }}>
      <h3 className="chart-title">📊 Category & Product Performance</h3>
      <div className="charts-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div>
          <h4>Top Categories by Revenue</h4>
          <canvas ref={topCategoriesRef} style={{ maxHeight: 250 }}></canvas>
        </div>
        <div>
          <h4>Product Performance</h4>
          <canvas ref={productPerformanceRef} style={{ maxHeight: 250 }}></canvas>
        </div>
      </div>
    </div>
  );
};
