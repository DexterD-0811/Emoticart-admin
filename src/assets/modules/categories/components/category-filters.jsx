export function CategoryFilters({ 
  onFilterChange, 
  onClearFilters, 
  query, 
  setQuery, 
  status, 
  setStatusFilter 
}) {
  return (
    <div className="filters-section">
      <div
        className="filter-group"
        style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr" }}
      >
        <input
          type="text"
          id="categorySearch"
          placeholder="Search categories..."
          className="filter-input"
          onChange={(event) => setQuery(event.target.value)}
        />

        <select
          id="productCountFilter"
          className="filter-select"
          onChange={(e) => onFilterChange("productCount", e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="empty">Empty (0 products)</option>
          <option value="low">Low (1–10 products)</option>
          <option value="medium">Medium (11–50 products)</option>
          <option value="high">High (50+ products)</option>
        </select>

        <select
          id="categoryStatusFilter"
          className="filter-select"
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button className="view-all-btn" onClick={onClearFilters}>
          Clear Filters
        </button>
      </div>
    </div>
  );
}
