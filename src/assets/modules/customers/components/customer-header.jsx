import React from "react";

export function CustomerHeader({ onExport }) {
  return (
    <header className="header">
      <h1>👥 Customer Management</h1>
      <div className="product-actions">
        <button
          className="add-product-btn"
          style={{ background: "#48bb78" }}
          onClick={() => onExport("csv")}
        >
          <span>📊</span> Export CSV
        </button>
        <button
          className="add-product-btn"
          style={{ background: "#ed8936" }}
          onClick={() => onExport("pdf")}
        >
          <span>📄</span> Export PDF
        </button>
      </div>
    </header>
  );
}
