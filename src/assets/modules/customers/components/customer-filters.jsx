import React from "react";

export function CustomerFilters({ onFilterChange, onClearFilters, customerCount }) {
  return (
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
  );
}
