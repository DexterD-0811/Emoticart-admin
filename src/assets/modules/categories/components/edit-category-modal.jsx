import { useState, useEffect } from "react";
import { useCategory } from "../../common/hooks/use-category";

export function EditCategoryModal({ isOpen, categoryId, onSave, onCancel, products = [] }) {
  const { getCategoryById } = useCategory();
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
    icon: "",
    status: "active",
    assignedProducts: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !categoryId) return;

    const fetchCategory = async () => {
      setIsLoading(true);
      try {
        const fetchedCategory = await getCategoryById(categoryId);
        // Map the fetched category to our state structure
        setCategoryData({
          name: fetchedCategory.name || "",
          description: fetchedCategory.description || "",
          icon: fetchedCategory.icon || "",
          status: fetchedCategory.status || "active",
          assignedProducts: fetchedCategory.products || [],
        });
      } catch (fetchError) {
        console.error("Failed to fetch category by ID:", fetchError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [isOpen, categoryId, getCategoryById]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const updatedCategoryData = {
      name: form.name.value,
      description: form.description.value,
      icon: form.icon.value,
      status: form.status.value,
      assignedProducts: products
        .filter((product, index) => form[`product-${index}`].checked)
        .map((product) => product.id),
    };

    onSave(updatedCategoryData);
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
          <h2 id="categoryModalTitle">Edit Category</h2>
          <button className="close-btn" onClick={onCancel}>
            ✕
          </button>
        </div>

        {isLoading ? (
          <p>Loading category details...</p>
        ) : (
          <form id="categoryForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="categoryName">Category Name *</label>
              <input
                type="text"
                id="categoryName"
                name="name"
                defaultValue={categoryData.name}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="categoryDescription">Description</label>
              <textarea
                id="categoryDescription"
                name="description"
                rows="3"
                placeholder="Brief description of this category..."
                defaultValue={categoryData.description}
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="categoryIcon">Category Icon</label>
                <input
                  id="categoryIcon"
                  name="icon"
                  type="text"
                  placeholder="Input icon here..."
                  defaultValue={categoryData.icon}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="categoryStatus">Status</label>
                <select
                  id="categoryStatus"
                  name="status"
                  defaultValue={categoryData.status}
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
                {products.length > 0 ? (
                  products.map((product, index) => {
                    const isAssigned = categoryData.assignedProducts.includes(
                      product.id
                    );
                    return (
                      <div key={product.id}>
                        <label>
                          <input
                            type="checkbox"
                            name={`product-${index}`}
                            defaultChecked={isAssigned}
                          />{" "}
                          {product.name}
                        </label>
                      </div>
                    );
                  })
                ) : (
                  <p style={{ color: "#888" }}>No products available</p>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Save Category
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
