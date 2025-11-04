import { useState, useEffect, useMemo } from 'react';
import { ProductHeader } from '../components/product-header';
import { ProductFilters } from '../components/product-filters';
import { ProductTable } from '../components/product-table';
import { useProduct } from '../../common/hooks/use-product';
import { AddProductModal } from '../components/add-product-modal';
import { DeleteProductModal } from '../components/delete-product-modal';
import { EditProductModal } from '../components/edit-product-modal';

export const ProductsPage = () => {
  const {
    allProducts,
    addProduct,
    data: products = [],
    updateProduct,
    deleteProduct,
    isPending,
    isFailed,
    isSuccess,
  } = useProduct();

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    minPrice: '',
    maxPrice: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    allProducts();
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.category) {
        const productCategoryId = typeof product.category === 'object' ? product.category._id : product.category;
        if (productCategoryId !== filters.category) return false;
      }
      if (filters.status) {
        if (filters.status === 'active' && !product.isActive) return false;
        if (filters.status === 'inactive' && product.isActive) return false;
      }
      if (filters.minPrice && product.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && product.price > Number(filters.maxPrice)) return false;
      return true;
    });
  }, [products, filters]);

  const handleSaveProduct = async (productData, productId = null) => {
    if (productId) {
      await updateProduct(productId, productData);
    } else {
      await addProduct(productData);
    }
    await allProducts();
    setIsModalOpen(false);
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }

  const handleToggleStatus = async (product) => {
    await updateProduct(product._id, { isActive: !product.isActive });
    await allProducts();
  }

  const handleEdit = (product) => {
    setProductToEdit(product);
    setEditModalOpen(true);
  }

  const handleDelete = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  }

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete._id);
      setDeleteModalOpen(false);
      setProductToDelete(null);
      await allProducts();
    }
  }

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setProductToDelete(null);
  }

  return (
    <div id="productsPage" className="page-section">
      <ProductHeader onAddProduct={() => setIsModalOpen(true)} />

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => handleSaveProduct(data)}
      />

      <DeleteProductModal
        isOpen={deleteModalOpen}
        product={productToDelete}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <EditProductModal
        isOpen={editModalOpen}
        product={productToEdit}
        onSave={async (updatedData) => {
          if (productToEdit) {
            await updateProduct(productToEdit._id, updatedData);
            await allProducts();
          }
          setEditModalOpen(false);
          setProductToEdit(null);
        }}
        onCancel={() => {
          setEditModalOpen(false);
          setProductToEdit(null);
        }}
      />

      <ProductFilters
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {isPending && <p>Loading products...</p>}
      {isFailed && <p style={{ color: "red" }}>Failed to load products.</p>}
      {isSuccess && (
        <ProductTable
          products={filteredProducts}
          onSort={(key) => console.log("Sort by", key)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
      )}
    </div>
  );
};
