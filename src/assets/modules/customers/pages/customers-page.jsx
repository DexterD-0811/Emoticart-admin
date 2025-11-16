import { useEffect, useState, useMemo, useCallback } from "react";
import { CustomerHeader } from "../components/customer-header";
import { CustomerFilters } from "../components/customer-filters";
import { CustomerTable } from "../components/customer-table";
import { CustomerKPI } from "../components/customer-kpi";
import { useCustomer } from "../../common/hooks/use-customer";
import { useCustomerStats } from "../../common/hooks/use-customer-stats";

export function CustomersPage() {
  const {
    allCustomers,
    data: customers = [],
    isPending,
    isFailed,
    isSuccess,
  } = useCustomer();

  const { allCustomerStats, data: stats = [] } = useCustomerStats();

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [ordersFilter, setOrdersFilter] = useState("");
  const [dateFromFilter, setDateFromFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const avgLifetimeValue = stats.length
  ? (stats.reduce((sum, s) => sum + (s.totalSpent || 0), 0) / stats.length).toFixed(2)
  : 0;


  useEffect(() => {
    allCustomers();
    allCustomerStats();
  }, [allCustomers, allCustomerStats]);

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    if (name === "search") setQuery(value);
    if (name === "status") setStatusFilter(value);
    if (name === "orders") setOrdersFilter(value);
    if (name === "dateFrom") setDateFromFilter(value);
  }, []);

  const handleClearFilters = useCallback(() => {
    setQuery("");
    setStatusFilter("");
    setOrdersFilter("");
    setDateFromFilter("");
  }, []);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const filteredCustomers = useMemo(() => {
    return customers
      .filter((c) => {
        const customerStat = stats.find((s) => s._id === c._id);
        const customerOrders = customerStat?.totalOrders ?? 0;

        if (
          query &&
          !(
            c.name.toLowerCase().includes(query.toLowerCase()) ||
            c.email.toLowerCase().includes(query.toLowerCase())
          )
        ) return false;

        if (statusFilter && c.status !== statusFilter) return false;

        switch (ordersFilter) {
          case "new":
            if (customerOrders !== 0) return false;
            break;
          case "low":
            if (customerOrders < 1 || customerOrders > 5) return false;
            break;
          case "medium":
            if (customerOrders < 6 || customerOrders <= 20 === false) return false;
            if (customerOrders < 6 || customerOrders > 20) return false;
            break;
          case "high":
            if (customerOrders <= 20) return false;
            break;
        }

        if (dateFromFilter) {
          const signupDate = new Date(c.createdAt);
          const fromDate = new Date(dateFromFilter);
          signupDate.setHours(0, 0, 0, 0);
          fromDate.setHours(0, 0, 0, 0);
          if (signupDate < fromDate) return false;
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
  }, [customers, stats, query, statusFilter, ordersFilter, dateFromFilter, sortKey, sortOrder]);

  return (
    <div id="customersPage" className="page-section">
      <CustomerHeader />
      <CustomerFilters
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        customerCount={filteredCustomers.length}
      />
      <CustomerKPI
        totalCustomers={customers.length}
        activeCustomers={customers.filter((c) => c.status === "active").length}
        newCustomers={customers.filter((c) => {
          const createdAt = new Date(c.createdAt);
          const now = new Date();
          return (now - createdAt) / (1000 * 60 * 60 * 24) <= 30;
        }).length}
        avgLifetimeValue={`$${avgLifetimeValue}`}
      />
      {isPending && <p>Loading customers...</p>}
      {isFailed && <p style={{ color: "red" }}>Failed to load customers.</p>}
      {isSuccess && (
        <CustomerTable
          customers={filteredCustomers}
          stats={stats}
          onSort={handleSort}
          sortKey={sortKey}
          sortOrder={sortOrder}
        />
      )}
    </div>
  );
}
