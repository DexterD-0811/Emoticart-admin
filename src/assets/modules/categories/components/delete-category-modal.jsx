export function DeleteCategoryModal({ isOpen, category, onConfirm, onCancel }) {
  if (!isOpen || !category) return null;

  const productCount = category.productIds?.length || 0;
  const warningText = productCount
    ? `This category contains ${productCount} product(s). Deleting it will unassign these products.`
    : 'This action cannot be undone.';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1004,
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '32px',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          textAlign: 'center',
          maxWidth: '450px',
          margin: '20px',
        }}
      >
        <h3 style={{ margin: '0 0 16px 0', color: '#2d3748', fontSize: '20px' }}>Delete Category</h3>
        <p style={{ margin: '0 0 8px 0', color: '#4a5568' }}>
          Are you sure you want to delete "{category.name}"?
        </p>
        <p style={{ margin: '0 0 24px 0', color: '#e53e3e', fontSize: '14px' }}>
          {warningText}
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={onConfirm}
            style={{
              background: '#f56565',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            Yes, Delete
          </button>
          <button
            onClick={onCancel}
            style={{
              background: '#e2e8f0',
              color: '#4a5568',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
