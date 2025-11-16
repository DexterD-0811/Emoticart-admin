import React from "react";

export const TopSellingProductsTable = ({ orders = [] }) => {
  const productMap = {};

  orders.forEach(order => {
    if (!order.orderItems) return;

    order.orderItems.forEach(item => {
      const productName = item.product?.name || item.name;
      const productIcon = item.icon || "";
      const productPrice = item.product?.price || 0;
      const quantity = item.quantity || 0;

      if (!productMap[productName]) {
        productMap[productName] = { unitsSold: 0, revenue: 0, icon: productIcon };
      }

      productMap[productName].unitsSold += quantity;
      productMap[productName].revenue += productPrice * quantity;
    });
  });

  const topProducts = Object.entries(productMap)
    .map(([product, { unitsSold, revenue, icon }]) => ({ product, unitsSold, revenue, icon }))
    .sort((a, b) => b.unitsSold - a.unitsSold)
    .slice(0, 3);

  return (
    <div
      className="analytics-table-container"
      style={{ maxHeight: 300, overflowY: "auto", marginBottom: 24 }}
    >
      <h4>Top Selling Products</h4>
      <table className="analytics-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Units Sold</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {topProducts.length > 0 ? (
            topProducts.map(({ product, unitsSold, revenue, icon }, index) => (
              <tr key={index}>
                <td>{icon} {product}</td>
                <td>{unitsSold}</td>
                <td>${revenue.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", color: "#888" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
