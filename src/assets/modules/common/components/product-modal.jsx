import { useRef } from "react";

export function ProductModal({ onClose, onSave }) {
  const imageInputRef = useRef();
  const imagePreviewRef = useRef();

  const handleSaveProduct = (e) => {
    e.preventDefault();
    // Collect form data and call onSave()
    const formData = new FormData(e.target);
    const product = Object.fromEntries(formData.entries());
    onSave?.(product);
  };

  const handleImagePreview = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (imagePreviewRef.current) {
          imagePreviewRef.current.style.backgroundImage = `url(${reader.result})`;
          imagePreviewRef.current.innerHTML = ''; // remove placeholder
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div id="productModal" className="modal" style={{ display: "block" /* or toggle via props */ }}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="modalTitle">Add New Product</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form id="productForm" onSubmit={handleSaveProduct}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="productName">Product Name *</label>
              <input type="text" id="productName" name="name" required />
            </div>

            <div className="form-group">
              <label htmlFor="productCategory">Category *</label>
              <select id="productCategory" name="category" required>
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Home & Garden">Home & Garden</option>
                <option value="Sports">Sports</option>
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
              <label htmlFor="productBrand">Brand</label>
              <input type="text" id="productBrand" name="brand" />
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
            <textarea id="productDescription" name="description" rows="3"></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="productImage">Product Image</label>
            <div className="image-upload">
              <input
                type="file"
                id="productImage"
                name="image"
                accept="image/*"
                ref={imageInputRef}
                onChange={handleImagePreview}
              />
              <div className="image-preview" id="imagePreview" ref={imagePreviewRef}>
                <span>📷 Click to upload image</span>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-btn">Save Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}
