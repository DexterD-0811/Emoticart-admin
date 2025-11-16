import React from "react";

export const TopProductsByRevenueTable = ({ orders = [] }) => {
  const productRevenueMap = {};

  orders.forEach(order => {
    if (!order.orderItems) return;

    order.orderItems.forEach(item => {
      const productName = item.product?.name || item.name;
      const productIcon = item.icon || ""; // get the icon
      const productPrice = item.product?.price || 0;
      const quantity = item.quantity || 0;

      if (!productRevenueMap[productName]) {
        productRevenueMap[productName] = { revenue: 0, icon: productIcon };
      }
      productRevenueMap[productName].revenue += productPrice * quantity;
    });
  });

  const topProducts = Object.entries(productRevenueMap)
    .map(([product, { revenue, icon }]) => ({ product, revenue, icon }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 3); // top 3 products

  return (
    <div
      className="analytics-table-container"
      style={{ maxHeight: 300, overflowY: "auto", marginBottom: 24 }}
    >
      <h4>Top Products by Revenue</h4>
      <table className="analytics-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {topProducts.length ? (
            topProducts.map((item, index) => (
              <tr key={index}>
                <td>{item.icon} {item.product}</td>
                <td>${item.revenue.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
