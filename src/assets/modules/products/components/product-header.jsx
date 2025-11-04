import React from 'react';

export const ProductHeader = ({ onAddProduct }) => {
    return (
        <header className="header">
            <h1>📦 Product Management</h1>
            <div className="product-actions">
                <button className="add-product-btn" onClick={onAddProduct}>
                    <span>➕</span> Add New Product
                </button>
            </div>
        </header>
    );
};
