export function CustomerRow({ customer, stat = {} }) {
  return (
    <tr key={customer._id}>
      <td>{customer.name}</td>
      <td>{customer.email}</td>
      <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
      <td>{stat.totalOrders ?? 0}</td>
      <td>{`$${(stat.totalSpent ?? 0).toFixed(2)}`}</td>
      <td>
        <button onClick={() => alert(`View ${customer.name}`)}>View</button>
      </td>
    </tr>
  );
}
