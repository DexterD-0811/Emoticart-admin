import { useEffect, useState } from 'react';
import { useCategory } from '../../common/hooks/use-category';

export function EditProductModal({ isOpen, product, onClose, onSave }) {
  const { allCategories, data: categories, isPending } = useCategory();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    isActive: true,
    description: '',
    icon: ''
  });

  useEffect(() => {
    if (isOpen) {
      allCategories();
    }
  }, [isOpen, allCategories]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || '',
        price: product.price || '',
        stock: product.stock || '',
        isActive: product.isActive ?? true,
        description: product.description || '',
        icon: product.icon || ''
      });
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData, product._id);
  };

  return (
    <div
      id="editProductModal"
      className="modal"
      style={{ display: "flex" }}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="modalTitle">Edit Product</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form id="productForm" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="productName">Product Name</label>
              <input
                type="text"
                id="productName"
                name="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="productCategory">Category</label>
              <select
                id="productCategory"
                name="category"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
              >
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
              <label htmlFor="productPrice">Price</label>
              <input
                type="number"
                id="productPrice"
                name="price"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="productStock">Stock Quantity</label>
              <input
                type="number"
                id="productStock"
                name="stock"
                value={formData.stock}
                onChange={(e) => handleChange('stock', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="productStatus">Status</label>
              <select
                id="productStatus"
                name="status"
                value={formData.isActive ? 'active' : 'inactive'}
                onChange={(e) => handleChange('isActive', e.target.value === 'active')}
              >
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
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter product description..."
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="productIcon">Product Icon</label>
            <input
              type="text"
              id="productIcon"
              name="icon"
              value={formData.icon}
              onChange={(e) => handleChange('icon', e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
