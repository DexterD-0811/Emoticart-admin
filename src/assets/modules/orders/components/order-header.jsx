export function OrderHeader({ exportOrders }) {
  return (
    <header className="header">
      <h1>🛒 Order Management</h1>
      <div className="product-actions">
        <button
          className="add-product-btn"
          style={{ background: "#48bb78" }}
          onClick={() => exportOrders("csv")}
        >
          📊 Export CSV
        </button>
        <button
          className="add-product-btn"
          style={{ background: "#ed8936" }}
          onClick={() => exportOrders("pdf")}
        >
          📄 Export PDF
        </button>
      </div>
    </header>
  );
}
