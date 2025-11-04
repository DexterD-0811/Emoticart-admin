import React from 'react';

export const ProductRow = ({ product, onEdit, onToggleStatus, onDelete }) => {
    const stockClass =
        product.stock < 20
            ? 'stock-low'
            : product.stock < 50
            ? 'stock-medium'
            : 'stock-high';
    return (
        <tr>
            <td>{product.icon}  {product.name}</td>
            <td>
            {product.category ? (
                <>
                    {product.category.icon} {product.category.name}
                </>
            ) : (
                <em>Uncategorized</em>
            )}
            </td>
            <td>${product.price.toFixed(2)}</td>
            <td>
                <span className={`stock-badge ${stockClass}`}>{product.stock}</span>
            </td>
            <td>
                <span className='status-badge ${statusClass}'>
                    {product.isActive === true ? 'Active' : 'Inactive'}
                </span>
            </td>
            <td>
                <button className="action-btn edit-btn" onClick={() => onEdit(product)}>
                Edit
                </button>
                <button
                className="action-btn toggle-btn"
                onClick={() => onToggleStatus(product)}
                >
                {product.isActive === true ? 'Deactivate' : 'Activate'}
                </button>
                <button className="action-btn delete-btn" onClick={() => onDelete(product)}>
                Delete
                </button>
            </td>
        </tr>
    );
};
