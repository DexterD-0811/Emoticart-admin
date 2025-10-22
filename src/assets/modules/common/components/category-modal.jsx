import { useState } from "react";

export function CategoryModal({ onClose, onSave }) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("📱");
  const [categoryStatus, setCategoryStatus] = useState("active");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCategory = {
      name: categoryName,
      description: categoryDescription,
      icon: categoryIcon,
      status: categoryStatus,
      // Add product assignment if needed
    };

    onSave?.(newCategory);
  };

  return (
    <div id="categoryModal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="categoryModalTitle">Add New Category</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form id="categoryForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="categoryName">Category Name *</label>
            <input
              type="text"
              id="categoryName"
              required
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoryDescription">Description</label>
            <textarea
              id="categoryDescription"
              rows="3"
              placeholder="Brief description of this category..."
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="categoryIcon">Category Icon</label>
              <select
                id="categoryIcon"
                value={categoryIcon}
                onChange={(e) => setCategoryIcon(e.target.value)}
              >
                <option value="📱">📱 Electronics</option>
                <option value="👕">👕 Clothing</option>
                <option value="📚">📚 Books</option>
                <option value="🏠">🏠 Home & Garden</option>
                <option value="⚽">⚽ Sports</option>
                <option value="🎮">🎮 Gaming</option>
                <option value="🍔">🍔 Food & Beverage</option>
                <option value="💄">💄 Beauty</option>
                <option value="🚗">🚗 Automotive</option>
                <option value="🎵">🎵 Music</option>
                <option value="🎨">🎨 Art & Crafts</option>
                <option value="🏥">🏥 Health</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="categoryStatus">Status</label>
              <select
                id="categoryStatus"
                value={categoryStatus}
                onChange={(e) => setCategoryStatus(e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="categoryProducts">Assign Products</label>
            <div
              id="productAssignment"
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                border: "2px solid #e2e8f0",
                borderRadius: "8px",
                padding: "12px",
              }}
            >
              {/* Map product checkboxes here */}
              <p style={{ color: "#888" }}>[Product checkboxes go here]</p>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
