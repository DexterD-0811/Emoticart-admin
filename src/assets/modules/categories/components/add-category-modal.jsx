export function AddCategoryModal({
  isOpen,
  onClose,
  onSave,
  products = [],
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value,
      description: form.description.value,
      icon: form.icon.value,
      status: form.status.value,
    }
    onSave(data);
  };

  if (!isOpen) return null;

  return (
    <div
      id="categoryModal"
      className="modal"
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <div className="modal-content">
        {/* Header */}
        <div className="modal-header">
          <h2 id="categoryModalTitle">Add New Category</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Form */}
        <form id="categoryForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="categoryName">Category Name *</label>
            <input type="text" id="categoryName" name="name" required />
          </div>

          <div className="form-group">
            <label htmlFor="categoryDescription">Description</label>
            <textarea
              id="categoryDescription"
              rows="3"
              placeholder="Brief description of this category..."
              name="description"
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="categoryIcon">Category Icon *</label>
              <input 
              id="categoryIcon" 
              name="icon" 
              type="text"
              placeholder="Input icon here..."
              required />
            </div>

            <div className="form-group">
              <label htmlFor="categoryStatus">Status</label>
              <select id="categoryStatus" name="status">
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
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id}>
                    <label>
                      <input
                        type="checkbox"
                        value={product.id}
                        defaultChecked={product.assigned}
                      />{" "}
                      {product.name}
                    </label>
                  </div>
                ))
              ) : (
                <p style={{ color: "#888" }}>No products available</p>
              )}
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
