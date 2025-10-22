import { useEffect } from "react";

export function ProductsPage() {
  const showAddProduct = () => {
    // TODO: implement add product modal or page logic
    console.log("Add product clicked");
  };

  const filterProducts = () => {
    // TODO: implement product filtering logic
    console.log("Filtering products...");
  };

  const sortProducts = (field) => {
    // TODO: implement sorting logic
    console.log(`Sorting by ${field}`);
  };

  useEffect(() => {
    // TODO: fetch or populate product list on mount
  }, []);

  return (
    <div id="productsPage" className="page-section">
      <header className="header">
        <h1>📦 Product Management</h1>
        <div className="product-actions">
          <button className="add-product-btn" onClick={showAddProduct}>
            <span>➕</span> Add New Product
          </button>
        </div>
      </header>

      {/* Product Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <input
            type="text"
            id="productSearch"
            placeholder="Search products..."
            className="filter-input"
            onInput={filterProducts}
          />
          <select
            id="categoryFilter"
            className="filter-select"
            onChange={filterProducts}
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Home & Garden">Home & Garden</option>
            <option value="Sports">Sports</option>
          </select>

          <select
            id="statusFilter"
            className="filter-select"
            onChange={filterProducts}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <div className="price-range">
            <input
              type="number"
              id="minPrice"
              placeholder="Min Price"
              className="price-input"
              onInput={filterProducts}
            />
            <input
              type="number"
              id="maxPrice"
              placeholder="Max Price"
              className="price-input"
              onInput={filterProducts}
            />
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th onClick={() => sortProducts("name")}>
                Product Name <span className="sort-icon">↕️</span>
              </th>
              <th onClick={() => sortProducts("category")}>
                Category <span className="sort-icon">↕️</span>
              </th>
              <th onClick={() => sortProducts("price")}>
                Price <span className="sort-icon">↕️</span>
              </th>
              <th onClick={() => sortProducts("stock")}>
                Stock <span className="sort-icon">↕️</span>
              </th>
              <th onClick={() => sortProducts("status")}>
                Status <span className="sort-icon">↕️</span>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="productsTableBody">
            {/* TODO: Map over your products array here */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
