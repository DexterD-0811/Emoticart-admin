import { useEffect } from 'react';
import { useCategory } from '../../common/hooks/use-category';

export function AddProductModal({ isOpen, onClose, onSave }) {
  const { allCategories, data: categories, isPending } = useCategory();

  useEffect(() => {
    if (isOpen) {
      allCategories();
    }
  }, [isOpen, allCategories]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const data = {
      name: form.name.value,
      category: form.category.value,
      price: parseFloat(form.price.value),
      stock: parseInt(form.stock.value),
      isActive: form.status.value === 'active',
      description: form.description.value,
      icon: form.icon.value,
    };

    onSave(data);
  };

  if (!isOpen) return null;

  return (
    <div
      id="productModal"
      className="modal"
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="modalTitle">Add New Product</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form id="productForm" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="productName">Product Name *</label>
              <input type="text" id="productName" name="name" required />
            </div>

            <div className="form-group">
              <label htmlFor="productCategory">Category *</label>
              <select id="productCategory" name="category" required>
                {isPending ? (
                  <option>Loading categories...</option>
                ) : categories.length === 0 ? (
                  <option>No categories available</option>
                ) : (
                  <>
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="productPrice">Price *</label>
              <input type="number" id="productPrice" name="price" step="0.01" required />
            </div>

            <div className="form-group">
              <label htmlFor="productStock">Stock Quantity *</label>
              <input type="number" id="productStock" name="stock" required />
            </div>

            <div className="form-group">
              <label htmlFor="productStatus">Status</label>
              <select id="productStatus" name="status">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="productDescription">Description</label>
            <textarea
              id="productDescription"
              name="description"
              rows="3"
              placeholder="Enter product description..."
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="productIcon">Product Icon</label>
            <div className="image-upload">
                <input 
                type='text' 
                placeholder="Product Icon" 
                name="icon" 
                id="productIcon"
                required
                />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
