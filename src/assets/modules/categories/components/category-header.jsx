export function CategoryHeader({ onAddCategory }) {
  return (
    <header className="header">
      <h1>🗂️ Category Management</h1>
      <div className="product-actions">
        <button className="add-product-btn" onClick={onAddCategory}>
          <span>➕</span> Add New Category
        </button>
      </div>
    </header>
  );
}
