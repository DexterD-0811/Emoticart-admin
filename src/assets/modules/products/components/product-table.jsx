import { ProductRow } from './product-row';

export const ProductTable = ({ products, onSort, onEdit, onDelete, onToggleStatus }) => {
    const handleSort = (key) => {
        onSort(key);
    };

    return (
        <div className="products-table-container">
            <table className="products-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('name')}>
                            Product Name <span className="sort-icon">↕️</span>
                        </th>
                        <th onClick={() => handleSort('category')}>
                            Category <span className="sort-icon">↕️</span>
                        </th>
                        <th onClick={() => handleSort('price')}>
                            Price <span className="sort-icon">↕️</span>
                        </th>
                        <th onClick={() => handleSort('stock')}>
                            Stock <span className="sort-icon">↕️</span>
                        </th>
                        <th onClick={() => handleSort('status')}>
                            Status <span className="sort-icon">↕️</span>
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <ProductRow
                            key={product._id}
                            product={product}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onToggleStatus={onToggleStatus}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
