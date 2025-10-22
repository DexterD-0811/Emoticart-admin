import React from "react";

export const TopBuyersTable = ({ buyers }) => {
  return (
    <div
      className="analytics-table-container"
      style={{ maxHeight: 300, overflowY: "auto", marginBottom: 24 }}
    >
      <h4>Top Buyers</h4>
      <table className="analytics-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Total Spend</th>
          </tr>
        </thead>
        <tbody>
          {buyers && buyers.length > 0 ? (
            buyers.map(({ id, customer, totalSpend }) => (
              <tr key={id}>
                <td>{customer}</td>
                <td>{totalSpend}</td>
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
