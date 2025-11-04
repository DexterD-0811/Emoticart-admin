import { useCategory } from '../../common/hooks/use-category';
import { useEffect } from 'react';

export const ProductFilters = ({
    filters,
    onFilterChange,
}) => {
    const { allCategories, data: categories, isPending } = useCategory();

    useEffect(() => {
        allCategories();
    }, [ allCategories]);
    return (
        <div className="filters-section">
            <div className="filter-group">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="filter-input"
                    value={filters.search}
                    onChange={(event) => onFilterChange('search', event.target.value)}
                />
                <select
                    className="filter-select"
                    value={filters.category}
                    onChange={(e) => onFilterChange('category', e.target.value)}
                >
                    {isPending ? (
                  <option>Loading categories...</option>
                ) : categories.length === 0 ? (
                  <option>No categories available</option>
                ) : (
                  <>
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </>
                )}
                </select>
                <select
                    className="filter-select"
                    value={filters.status}
                    onChange={(e) => onFilterChange('status', e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <div className="price-range">
                    <input
                        type="number"
                        placeholder="Min Price"
                        className="price-input"
                        value={filters.minPrice}
                        onChange={(e) => onFilterChange('minPrice', e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Max Price"
                        className="price-input"
                        value={filters.maxPrice}
                        onChange={(e) => onFilterChange('maxPrice', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};
