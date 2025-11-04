export function CategoryRow({ category, onEdit, onDelete, onToggleStatus }) {
  const statusClass = category.status === 'active' ? 'status-active' : 'status-inactive';

  return (
    <tr>
      <td>
        {category.icon && <span className="category-icon">{category.icon}</span>} {category.name}
      </td>
      <td>{category.description}</td>
      <td>{category.productCount ?? 0}</td>
      <td>
        <span className={`status-badge ${statusClass}`}>
          {category.status ?? 'inactive'}
        </span>
      </td>
      <td>{category.createdAt ? new Date(category.createdAt).toLocaleDateString() : '-'}</td>
      <td>
        <button className="action-btn edit-btn" onClick={() => onEdit(category)}>Edit</button>
        <button className="action-btn toggle-btn" onClick={() => onToggleStatus(category)}>
          {category.status === 'active' ? 'Deactivate' : 'Activate'}
        </button>
        <button className="action-btn delete-btn" onClick={() => onDelete(category)}>Delete</button>
      </td>
    </tr>
  );
}
