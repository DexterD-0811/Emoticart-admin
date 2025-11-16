import { useState, useEffect, useMemo } from "react";
import { OrderHeader } from "../components/order-header";
import { OrderFilters } from "../components/order-filters";
import { OrderTable } from "../components/order-table";
import { useOrder } from "../../common/hooks/use-order";

export function OrdersPage() {
  const { data: orders = [], allOrders, isPending, isFailed, isSuccess } = useOrder();

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    allOrders();
  }, [allOrders]);

  const filterOrders = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    if (id === "orderSearch") setQuery(value);
    if (id === "orderStatusFilter") setStatusFilter(value);
    if (id === "orderDateFrom") setDateFrom(value);
    if (id === "orderDateTo") setDateTo(value);
  };

  const clearOrderFilters = () => {
    setQuery("");
    setStatusFilter("");
    setDateFrom("");
    setDateTo("");
  };

  const sortOrders = (key) => {
    if (sortKey === key) setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const exportOrders = (format) => {
    alert(`Exporting ${format.toUpperCase()}`);
  };

  const filteredSortedOrders = useMemo(() => {
    return orders
      .filter((o) => {
        const orderId = (o?._id ?? "").toLowerCase();
        const userName = (o?.user?.name ?? "").toLowerCase();
        const userEmail = (o?.user?.email ?? "").toLowerCase();
        const searchQuery = query.toLowerCase();
        return orderId.includes(searchQuery) || userName.includes(searchQuery) || userEmail.includes(searchQuery);
      })
      .filter((o) => (statusFilter ? (o?.status ?? "").toLowerCase() === statusFilter.toLowerCase() : true))
      .filter((o) => {
        const orderDate = new Date(o.createdAt);
        if (dateFrom) {
          const from = new Date(dateFrom);
          from.setHours(0, 0, 0, 0);
          if (orderDate < from) return false;
        }
        if (dateTo) {
          const to = new Date(dateTo);
          to.setHours(23, 59, 59, 999);
          if (orderDate > to) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (!sortKey) return 0;
        let valA = a[sortKey];
        let valB = b[sortKey];
        if (typeof valA === "string") valA = valA.toLowerCase();
        if (typeof valB === "string") valB = valB.toLowerCase();
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [orders, query, statusFilter, dateFrom, dateTo, sortKey, sortOrder]);

  return (
    <div id="ordersPage" className="page-section">
      <OrderHeader exportOrders={exportOrders} />

      <OrderFilters filterOrders={filterOrders} clearOrderFilters={clearOrderFilters} />

      {isPending && <p>Loading orders...</p>}
      {isFailed && <p style={{ color: "red" }}>Failed to load orders.</p>}
      {isSuccess && (
        <>
          <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
            <span id="orderCount" style={{ color: "#718096", fontSize: 14, alignSelf: "center" }}>
              {filteredSortedOrders.length} orders
            </span>
          </div>

          <OrderTable sortOrders={sortOrders} orders={filteredSortedOrders} />
        </>
      )}
    </div>
  );
}
