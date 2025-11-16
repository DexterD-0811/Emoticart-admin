export function OrderRow({ order }) {

  const totalQuantity = order.orderItems?.reduce(
    (total, item) => total + item.quantity, 0
  ) || 0;
  return (
    <tr>
      <td>{order._id}</td>
      <td>{order.user.name}</td>
      <td>{totalQuantity}</td>
      <td>${order.totalPrice?.toFixed(2)}</td>
      <td>{order.status}</td>
      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
      <td>
        <button>Edit</button>
        <button>Delete</button>
      </td>
    </tr>
  );
}
