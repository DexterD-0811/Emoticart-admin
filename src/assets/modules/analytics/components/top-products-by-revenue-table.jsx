import React from "react";

export const TopProductsByRevenueTable = () => {
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
        <tbody id="topProductsByRevenueTable">
          {/* Rows will be dynamically populated */}
        </tbody>
      </table>
    </div>
  );
};
