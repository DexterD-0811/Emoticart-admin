export function OrdersPage({
  filterOrders,
  clearOrderFilters,
  exportOrders,
  sortOrders,
  orderCount,
  children, // for rendering order rows inside tbody
}) {
  return (
    <div id="ordersPage" className="page-section">
      <header className="header">
        <h1>🛒 Order Management</h1>
        <div className="product-actions">
          <button
            className="add-product-btn"
            style={{ background: "#48bb78" }}
            onClick={() => exportOrders("csv")}
          >
            <span>📊</span> Export CSV
          </button>
          <button
            className="add-product-btn"
            style={{ background: "#ed8936" }}
            onClick={() => exportOrders("pdf")}
          >
            <span>📄</span> Export PDF
          </button>
        </div>
      </header>

      {/* Order Filters */}
      <div className="filters-section">
        <div className="filter-group" style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr" }}>
          <input
            type="text"
            id="orderSearch"
            placeholder="Search by Order ID or Customer..."
            className="filter-input"
            onInput={filterOrders}
          />
          <select id="orderStatusFilter" className="filter-select" onChange={filterOrders}>
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <input type="date" id="orderDateFrom" className="filter-input" onChange={filterOrders} title="From Date" />
          <input type="date" id="orderDateTo" className="filter-input" onChange={filterOrders} title="To Date" />
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
          <button className="view-all-btn" onClick={clearOrderFilters}>
            Clear Filters
          </button>
          <span id="orderCount" style={{ color: "#718096", fontSize: 14, alignSelf: "center" }}>
            {orderCount}
          </span>
        </div>
      </div>

      {/* Orders Table */}
      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th onClick={() => sortOrders("id")}>
                Order ID <span className="sort-icon">↕️</span>
              </th>
              <th onClick={() => sortOrders("customer")}>
                Customer <span className="sort-icon">↕️</span>
              </th>
              <th onClick={() => sortOrders("items")}>
                Items <span className="sort-icon">↕️</span>
              </th>
              <th onClick={() => sortOrders("total")}>
                Total <span className="sort-icon">↕️</span>
              </th>
              <th onClick={() => sortOrders("status")}>
                Status <span className="sort-icon">↕️</span>
              </th>
              <th onClick={() => sortOrders("date")}>
                Order Date <span className="sort-icon">↕️</span>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="ordersTableBody">{children}</tbody>
        </table>
      </div>
    </div>
  );
}
