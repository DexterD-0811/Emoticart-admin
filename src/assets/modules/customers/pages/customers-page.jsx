import React from "react";

export function CustomersPage({
  onExport,
  onFilterChange,
  onClearFilters,
  onSort,
  customers,
  customerCount,
  totalCustomers,
  activeCustomers,
  newCustomers,
  avgLifetimeValue,
  customersGrowth,
  activeGrowth,
  newGrowth,
  clvGrowth,
}) {
  return (
    <section id="customersPage" className="page-section">
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

      {/* Filters */}
      <div className="filters-section">
        <div
          className="filter-group"
          style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr" }}
        >
          <input
            type="text"
            id="customerSearch"
            placeholder="Search by name or email..."
            className="filter-input"
            onChange={onFilterChange}
            name="search"
          />
          <select
            id="customerStatusFilter"
            className="filter-select"
            onChange={onFilterChange}
            name="status"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="disabled">Disabled</option>
          </select>
          <select
            id="customerOrdersFilter"
            className="filter-select"
            onChange={onFilterChange}
            name="orders"
          >
            <option value="">All Customers</option>
            <option value="new">New (0 orders)</option>
            <option value="low">Low (1-5 orders)</option>
            <option value="medium">Medium (6-20 orders)</option>
            <option value="high">High (20+ orders)</option>
          </select>
          <input
            type="date"
            id="customerDateFrom"
            className="filter-input"
            onChange={onFilterChange}
            name="dateFrom"
            title="Signup Date From"
          />
        </div>
        <div
          style={{
            marginTop: 12,
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <button className="view-all-btn" onClick={onClearFilters}>
            Clear Filters
          </button>
          <span
            id="customerCount"
            style={{ color: "#718096", fontSize: 14, alignSelf: "center" }}
          >
            {customerCount}
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <section
        className="kpi-grid"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", marginBottom: 24 }}
      >
        <div className="kpi-card users">
          <div className="kpi-header">
            <span className="kpi-title">Total Customers</span>
            <div className="kpi-icon" style={{ background: "#d6bcfa" }}>👥</div>
          </div>
          <div className="kpi-value" id="totalCustomers">{totalCustomers}</div>
          <div className="kpi-change positive" id="customersGrowth">{customersGrowth}</div>
        </div>

        <div className="kpi-card sales">
          <div className="kpi-header">
            <span className="kpi-title">Active Customers</span>
            <div className="kpi-icon" style={{ background: "#c6f6d5" }}>✅</div>
          </div>
          <div className="kpi-value" id="activeCustomers">{activeCustomers}</div>
          <div className="kpi-change positive" id="activeGrowth">{activeGrowth}</div>
        </div>

        <div className="kpi-card orders">
          <div className="kpi-header">
            <span className="kpi-title">New This Month</span>
            <div className="kpi-icon" style={{ background: "#bee3f8" }}>🆕</div>
          </div>
          <div className="kpi-value" id="newCustomers">{newCustomers}</div>
          <div className="kpi-change positive" id="newGrowth">{newGrowth}</div>
        </div>

        <div className="kpi-card revenue">
          <div className="kpi-header">
            <span className="kpi-title">Avg. Lifetime Value</span>
            <div className="kpi-icon" style={{ background: "#fbd38d" }}>💰</div>
          </div>
          <div className="kpi-value" id="avgLifetimeValue">{avgLifetimeValue}</div>
          <div className="kpi-change positive" id="clvGrowth">{clvGrowth}</div>
        </div>
      </section>

      {/* Customers Table */}
      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              {[
                { label: "Customer", key: "name" },
                { label: "Email", key: "email" },
                { label: "Signup Date", key: "signupDate" },
                { label: "Total Orders", key: "totalOrders" },
                { label: "Total Spent", key: "totalSpent" },
                { label: "Last Login", key: "lastLogin" },
                { label: "Status", key: "status" },
              ].map(({ label, key }) => (
                <th key={key} onClick={() => onSort(key)}>
                  {label} <span className="sort-icon">↕️</span>
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="customersTableBody">
            {(customers || []).map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.signupDate}</td>
                <td>{customer.totalOrders}</td>
                <td>{customer.totalSpent}</td>
                <td>{customer.lastLogin}</td>
                <td>{customer.status}</td>
                <td>
                  <button onClick={() => alert(`View ${customer.name}`)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
