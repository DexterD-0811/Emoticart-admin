import React from "react";

export const RegionalPerformanceTable = ({ orders = [] }) => {
  const regionMap = {};

  orders.forEach(order => {
    const region = order.shippingAddress?.city || "Unknown";
    const totalPrice = order.totalPrice || 0;

    if (!regionMap[region]) {
      regionMap[region] = { revenue: 0, orders: 0 };
    }

    regionMap[region].revenue += totalPrice;
    regionMap[region].orders += 1;
  });

  const regionalData = Object.entries(regionMap)
    .map(([region, { revenue, orders }]) => ({ region, revenue, orders }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 3);

  return (
    <div
      className="analytics-table-container"
      style={{ maxHeight: 300, overflowY: "auto", marginBottom: 24 }}
    >
      <h4>Regional Performance</h4>
      <table className="analytics-table">
        <thead>
          <tr>
            <th>Region</th>
            <th>Revenue</th>
            <th>Orders</th>
          </tr>
        </thead>
        <tbody>
          {regionalData.length > 0 ? (
            regionalData.map(({ region, revenue, orders }, index) => (
              <tr key={index}>
                <td>{region}</td>
                <td>${revenue.toFixed(2)}</td>
                <td>{orders}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", color: "#888" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
