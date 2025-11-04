import { CategoryRow } from "./category-row";

export function CategoryTable({ categories, onSort, onEdit, onDelete, onToggleStatus, sortKey, sortOrder }) {
  const getArrow = (key) => {
    if (sortKey !== key) return "↕️";
    return sortOrder === "asc" ? "⬆️" : "⬇️";
  };

  return (
    <div className="products-table-container">
      <table className="products-table">
        <thead>
          <tr>
            <th onClick={() => onSort('name')}>Category Name {getArrow('name')}</th>
            <th onClick={() => onSort('description')}>Description {getArrow('description')}</th>
            <th onClick={() => onSort('productCount')}>Product Count {getArrow('productCount')}</th>
            <th onClick={() => onSort('status')}>Status {getArrow('status')}</th>
            <th onClick={() => onSort('createdAt')}>Created Date {getArrow('createdAt')}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center' }}>
                No categories found.
              </td>
            </tr>
          ) : (
            categories.map(category => (
              <CategoryRow
                key={category._id}
                category={category}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleStatus={onToggleStatus}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
