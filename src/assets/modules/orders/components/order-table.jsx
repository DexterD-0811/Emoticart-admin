import { OrderRow } from "./order-row";

export function OrderTable({ orders, sortOrders }) {
  const getArrow = (key) => "↕️"; // Add arrow logic if needed

  return (
    <div className="products-table-container">
      <table className="products-table">
        <thead>
          <tr>
            <th onClick={() => sortOrders("id")}>Order ID {getArrow("id")}</th>
            <th onClick={() => sortOrders("customer")}>Customer {getArrow("customer")}</th>
            <th onClick={() => sortOrders("items")}>Items {getArrow("items")}</th>
            <th onClick={() => sortOrders("total")}>Total {getArrow("total")}</th>
            <th onClick={() => sortOrders("status")}>Status {getArrow("status")}</th>
            <th onClick={() => sortOrders("date")}>Order Date {getArrow("date")}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order) => <OrderRow key={order._id} order={order} />)
          )}
        </tbody>
      </table>
    </div>
  );
}
