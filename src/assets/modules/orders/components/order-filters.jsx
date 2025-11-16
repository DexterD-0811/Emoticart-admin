export function OrderFilters({ filterOrders, clearOrderFilters }) {
  return (
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
      </div>
    </div>
  );
}
