import { AnalyticsFilters } from "../components/analytics-filters";
import { KPIGrid } from "../components/kpi-grid";
import { AnalyticsCharts } from "../components/analytics-chart";
import { OrderAnalytics } from "../components/order-analytics";
import { OrderSummaryGrid } from "../components/order-summary-grid";
import { useState, useEffect } from "react";
import { TopBuyersTable } from "../components/top-buyers-table.jsx";
import { TopSellingProductsTable } from "../components/top-selling-products-table.jsx";
import { CategoryProductPerformance } from "../components/category-product-performance.jsx";
import { RegionalPerformanceTable } from "../components/regional-performance-table.jsx";
import { TopProductsByRevenueTable } from "../components/top-products-by-revenue-table.jsx";
import { RevenueOrdersChart } from "../components/revenue-orders-chart.jsx";
import { useOrder } from "../../common/hooks/use-order";
import { useCustomerStats } from "../../common/hooks/use-customer-stats";
import { useProduct } from "../../common/hooks/use-product";

export const AnalyticsPage = () => {
  const { data: orders = [], allOrders } = useOrder();
  const { data: stats = [], allCustomerStats } = useCustomerStats();
  const { data: products = [], allProducts } = useProduct();

  const [filters, setFilters] = useState({
    analyticsDateRange: "30days",
    analyticsCategoryFilter: "",
    analyticsRegionFilter: "",
    analyticsDateFrom: "",
    analyticsDateTo: "",
  });

  useEffect(() => {
    allOrders();
    allCustomerStats();
    allProducts();
  }, [allOrders, allCustomerStats, allProducts]);

  function updateAnalytics(e) {
    const { id, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [id]: value,
    }));
  }

  function resetAnalyticsFilters() {
    setFilters({
      analyticsDateRange: "30days",
      analyticsCategoryFilter: "",
      analyticsRegionFilter: "",
      analyticsDateFrom: "",
      analyticsDateTo: "",
    });
  }

  const filteredOrders = orders.filter(order => {
    const categoryMatch =
      !filters.analyticsCategoryFilter ||
      order.orderItems.some(item => {
        const product = products.find(p => p._id === item.product._id);
        return product?.category?.name === filters.analyticsCategoryFilter;
      });

    const regionMatch =
      !filters.analyticsRegionFilter ||
      order.shippingAddress?.country === filters.analyticsRegionFilter;

    return categoryMatch && regionMatch;
  });

  const totalOrders = filteredOrders.length;
  const totalRevenue = filteredOrders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
  const avgOrderValue = totalOrders ? (totalRevenue / totalOrders).toFixed(2) : 0;

  const fulfilledOrders = filteredOrders.filter(order => order.status === "Shipped" || order.status === "Delivered").length;
  const orderFulfillmentRate = totalOrders ? ((fulfilledOrders / totalOrders) * 100).toFixed(2) + "%" : "0%";

  const ordersDelivered = filteredOrders.filter(order => order.status === "Delivered").length;
  const ordersCancelled = filteredOrders.filter(order => order.status === "Cancelled").length;
  const totalOrdersCompleted = ordersDelivered + ordersCancelled;
  const completionRate = totalOrdersCompleted ? ((ordersDelivered / totalOrdersCompleted) * 100).toFixed(2) : 0;

  const lifetimeValue = stats.reduce((sum, s) => sum + Number(s.totalSpent || 0), 0);

  const exportAnalytics = format => {
    alert(`Exporting analytics data as ${format.toUpperCase()}`);
  };

  const uniqueCategories = [...new Set(products.map(p => p.category?.name).filter(Boolean))];
  const uniqueRegions = [...new Set(orders.map(o => o.shippingAddress?.country).filter(Boolean))];

  return (
    <div id="analyticsPage" className="page-section">
      <header className="header">
        <h1>📈 Analytics Dashboard</h1>
        <div className="product-actions">
          <button className="add-product-btn" onClick={() => exportAnalytics("csv")} style={{ background: "#48bb78" }}>
            <span>📊</span> Export Data
          </button>
          <button className="add-product-btn" onClick={() => exportAnalytics("pdf")} style={{ background: "#ed8936" }}>
            <span>📄</span> Export Report
          </button>
        </div>
      </header>

      <AnalyticsFilters
        updateAnalytics={updateAnalytics}
        resetAnalyticsFilters={resetAnalyticsFilters}
        showCustomDateRange={filters.analyticsDateRange === "custom"}
        categories={uniqueCategories}
        regions={uniqueRegions}
        selectedCategory={filters.analyticsCategoryFilter}
        selectedRegion={filters.analyticsRegionFilter}
      />

      <KPIGrid
        avgOrderValue={`$${avgOrderValue}`}
        aovChange={`$${totalRevenue.toFixed(2)}`}
        lifetimeValue={lifetimeValue ? `$${lifetimeValue.toFixed(2)}` : "$0.00"}
        clvChange="+12.4% from last period"
        orderFulfillmentRate={orderFulfillmentRate}
        orderFulfillmentChange="+X% from last period"
      />

      <AnalyticsCharts orders={orders} />
      <RevenueOrdersChart orders={orders} />
      <OrderAnalytics orders={orders} />
      <OrderSummaryGrid
        orders={filteredOrders}
        completionRate={completionRate}
        avgOrderValue={`$${avgOrderValue}`}
        ordersCancelled={ordersCancelled}
        ordersDelivered={ordersDelivered}
      />
      <TopBuyersTable stats={stats.sort((a, b) => b.totalSpent - a.totalSpent)} />
      <TopSellingProductsTable orders={filteredOrders} />
      <CategoryProductPerformance orders={filteredOrders} products={products} />
      <TopProductsByRevenueTable orders={filteredOrders} />
      <RegionalPerformanceTable orders={filteredOrders} />
    </div>
  );
};
