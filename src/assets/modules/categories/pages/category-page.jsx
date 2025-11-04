import { useEffect, useState, useMemo } from "react";
import { useCategory } from "../../common/hooks/use-category";
import { useProduct } from "../../common/hooks/use-product";
import { CategoryHeader } from "../components/category-header";
import { CategoryFilters } from "../components/category-filters";
import { CategoryTable } from "../components/category-table";
import { AddCategoryModal } from "../components/add-category-modal";
import { DeleteCategoryModal } from "../components/delete-category-modal";
import { EditCategoryModal } from "../components/edit-category-modal";

export function CategoryPage() {
  const {
    allCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    data: categories = [],
    isPending,
    isFailed,
    isSuccess,
  } = useCategory();

  const {
    allProducts,
    data: products = [],
  } = useProduct();

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [productCountFilter, setProductCountFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  useEffect(() => {
    allCategories();
    allProducts();
  }, [allCategories, allProducts]);

  const categoriesWithCount = useMemo(() => {
    return categories.map(category => {
      const count = products.filter(p => {
        if (!p.category) return false;
        if (typeof p.category === "string") return p.category === category._id;
        if (typeof p.category === "object") return p.category._id === category._id;
        return false;
      }).length;
      return { ...category, productCount: count };
    });
  }, [categories, products]);

  const filteredCategories = useMemo(() => {
    return categoriesWithCount.filter(category => {
      if (query && !category.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (statusFilter) {
        if (statusFilter === "active" && category.status !== "active") return false;
        if (statusFilter === "inactive" && category.status !== "inactive") return false;
      }
      if (productCountFilter) {
        const count = category.productCount || 0;
        if (productCountFilter === "empty" && count !== 0) return false;
        if (productCountFilter === "low" && (count < 1 || count > 10)) return false;
        if (productCountFilter === "medium" && (count < 11 || count > 50)) return false;
        if (productCountFilter === "high" && count <= 50) return false;
      }
      return true;
    }).sort((a, b) => {
      if (!sortKey) return 0;
      let valA = a[sortKey];
      let valB = b[sortKey];
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [categoriesWithCount, query, statusFilter, productCountFilter, sortKey, sortOrder]);

  const handleSaveCategory = async (categoryData, categoryId = null) => {
    if (categoryId) {
      await updateCategory(categoryId, categoryData);
    } else {
      await addCategory(categoryData);
    }
    await allCategories();
    setIsModalOpen(false);
  };

  const handleEdit = (category) => {
    setCategoryToEdit(category);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (categoryToDelete) {
      await deleteCategory(categoryToDelete._id);
      setDeleteModalOpen(false);
      setCategoryToDelete(null);
      await allCategories();
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setCategoryToDelete(null);
  };

  const handleToggleStatus = async (category) => {
    const newStatus = category.status === "active" ? "inactive" : "active";
    await updateCategory(category._id, { status: newStatus });
    await allCategories();
  };

  const handleClearFilters = () => {
    setQuery("");
    setStatusFilter("");
    setProductCountFilter("");
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div id="categoriesPage" className="page-section">
      <CategoryHeader onAddCategory={() => setIsModalOpen(true)} />

      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
      />

      <EditCategoryModal
        isOpen={editModalOpen}
        categoryId={categoryToEdit ? categoryToEdit._id : null}
        onSave={async (updatedData) => {
          setEditModalOpen(false);
          if (categoryToEdit) {
            await updateCategory(categoryToEdit._id, updatedData);
            await allCategories();
          }
        }}
        onCancel={() => setEditModalOpen(false)}
      />

      <CategoryFilters
        query={query}
        setQuery={setQuery}
        status={statusFilter}
        setStatusFilter={setStatusFilter}
        onFilterChange={setProductCountFilter}
        onClearFilters={handleClearFilters}
      />

      {isPending && <p>Loading categories...</p>}
      {isFailed && <p style={{ color: "red" }}>Failed to load categories.</p>}
      {isSuccess && (
        <>
          <CategoryTable
            categories={filteredCategories}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            onToggleStatus={handleToggleStatus}
            onSort={handleSort}
            sortKey={sortKey}
            sortOrder={sortOrder}
          />

          <DeleteCategoryModal
            isOpen={deleteModalOpen}
            category={categoryToDelete}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        </>
      )}
    </div>
  );
}
