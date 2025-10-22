export function CategoryPage({
  onAddCategory,
  onFilterChange,
  onClearFilters,
  onSort,
  categories = [],
}) {
  return (
    <div id="categoriesPage" className="page-section">
      <header className="header">
        <h1>🗂️ Category Management</h1>
        <div className="product-actions">
          <button className="add-product-btn" onClick={onAddCategory}>
            <span>➕</span> Add New Category
          </button>
        </div>
      </header>

      {/* Category Filters */}
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
            onInput={(e) => onFilterChange("search", e.target.value)}
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
            onChange={(e) => onFilterChange("status", e.target.value)}
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

      {/* Categories Table */}
      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th onClick={() => onSort("name")}>
                Category Name <span className="sort-icon">↕️</span>
              </th>
              <th onClick={() => onSort("description")}>
                Description <span className="sort-icon">↕️</span>
              </th>
              <th onClick={() => onSort("productCount")}>
                Product Count <span className="sort-icon">↕️</span>
              </th>
              <th onClick={() => onSort("status")}>
                Status <span className="sort-icon">↕️</span>
              </th>
              <th onClick={() => onSort("createdDate")}>
                Created Date <span className="sort-icon">↕️</span>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="categoriesTableBody">
            {/* Example row rendering */}
            {categories.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>{category.productCount}</td>
                  <td>{category.status}</td>
                  <td>{category.createdDate}</td>
                  <td>
                    {/* You can replace with real handlers */}
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
