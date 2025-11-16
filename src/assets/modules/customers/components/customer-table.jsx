import { CustomerRow } from "./customer-row";

export function CustomerTable({ customers, onSort, stats = [] }) {
  const headers = [
    { label: "Customer", key: "name" },
    { label: "Email", key: "email" },
    { label: "Signup Date", key: "signupDate" },
    { label: "Total Orders", key: "totalOrders" },
    { label: "Total Spent", key: "totalSpent" },
  ];

  return (
    <div className="products-table-container">
      <table className="products-table">
        <thead>
          <tr>
            {headers.map(({ label, key }) => (
              <th key={key} onClick={() => onSort(key)}>
                {label} <span className="sort-icon">↕️</span>
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="customersTableBody">
          {customers.map((customer) => {
            const stat = stats.find((s) => s._id === customer._id) || {};
            return <CustomerRow key={customer._id} customer={customer} stat={stat} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
