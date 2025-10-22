import React from "react";

export const TopSellingProductsTable = ({ products }) => {
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
          {products && products.length > 0 ? (
            products.map(({ product, unitsSold, revenue }, index) => (
              <tr key={index}>
                <td>{product}</td>
                <td>{unitsSold}</td>
                <td>{revenue}</td>
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
