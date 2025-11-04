export function getCategoryName(categoryId, categories = []) {
  if (!categories) return null;
  const category = categories.find(c => c._id === categoryId);
  return category ? category.name : null;
}
