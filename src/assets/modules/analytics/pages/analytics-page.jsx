import React from "react";
import { AnalyticsFilters } from "../components/analytics-filters";
import { KPIGrid } from "../components/kpi-grid";
import { AnalyticsCharts } from "../components/analytics-chart";
import { OrderAnalytics } from "../components/order-analytics";
import { OrderSummaryGrid } from "../components/order-summary-grid";
import { CustomerAnalytics } from "../components/customer-analytics";
import { useState } from "react";
import { TopBuyersTable } from "../components/top-buyers-table.jsx";
import { ProductAnalytics } from "../components/product-analytics.jsx";
import { TopSellingProductsTable } from "../components/top-selling-products-table.jsx";
import { CategoryProductPerformance } from "../components/category-product-performance.jsx";
import { RegionalPerformanceTable } from "../components/regional-performance-table.jsx";
import { TopProductsByRevenueTable } from "../components/top-products-by-revenue-table.jsx";

export const AnalyticsPage = () => {

    const [filters, setFilters] = useState({
    analyticsDateRange: '30days',
    analyticsCategoryFilter: '',
    analyticsRegionFilter: '',
    analyticsDateFrom: '',
    analyticsDateTo: '',
  });

  function updateAnalytics(e) {
    const { id, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  function resetAnalyticsFilters() {
    setFilters({
      analyticsDateRange: '30days',
      analyticsCategoryFilter: '',
      analyticsRegionFilter: '',
      analyticsDateFrom: '',
      analyticsDateTo: '',
    });
  }
  const showCustomDateRange = filters.analyticsDateRange === 'custom';

  const sampleProducts = [
  { product: "Product A", unitsSold: 120, revenue: "$3,600" },
  { product: "Product B", unitsSold: 75, revenue: "$2,250" },
  // add more products as needed
];

  const topProductsData = [
  { product: "Product A", revenue: "$10,000" },
  { product: "Product B", revenue: "$8,500" },
  // ...more data
];

const regionalPerformanceData = [
  { region: "North", revenue: "$20,000", orders: 150 },
  { region: "South", revenue: "$15,000", orders: 120 },
  // ...more data
];

  return (
    <div id="analyticsPage" className="page-section">
      <header className="header">
        <h1>📈 Analytics Dashboard</h1>
        <div className="product-actions">
          <button
            className="add-product-btn"
            onClick={() => exportAnalytics("csv")}
            style={{ background: "#48bb78" }}
          >
            <span>📊</span> Export Data
          </button>
          <button
            className="add-product-btn"
            onClick={() => exportAnalytics("pdf")}
            style={{ background: "#ed8936" }}
          >
            <span>📄</span> Export Report
          </button>
        </div>
      </header>

      {/* Analytics Filters */}
\      <AnalyticsFilters
        updateAnalytics={updateAnalytics}
        resetAnalyticsFilters={resetAnalyticsFilters}
        showCustomerDateRange={filters.analyticsDateRange === "custom"}
      />

      {/* Analytics KPIs */}
      <KPIGrid
        avgOrderValue="$164.25"
        aovChange="+8.2% from last period"
        customerLTV="$892.50"
        clvChange="+12.4% from last period"
        conversionRate="3.24%"
        conversionChange="+0.8% from last period"
        returnRate="42.8%"
        returnChange="+5.1% from last period"
      />



      {/* Main Analytics Charts */}
      <AnalyticsCharts />


      {/* Revenue vs Orders Chart */}
      <div className="chart-container" style={{ marginBottom: 24 }}>
        <h3 className="chart-title">Revenue vs Orders Correlation</h3>
        <canvas id="revenueOrdersChart" className="chart-canvas"></canvas>
      </div>

      {/* Order Analytics Section */}
      <OrderAnalytics />

      {/* Order Metrics Grid */}
      <OrderSummaryGrid />

      {/* Customer Analytics */}
      <CustomerAnalytics />

      {/* Top Buyers Table */}
      <TopBuyersTable />

      {/* Product Analytics */}
      <ProductAnalytics />

      {/* Top Selling Products Table */}
      <TopSellingProductsTable products={sampleProducts} />

      {/* Category & Product Performance */}
      <CategoryProductPerformance />

      {/* Detailed Analytics Tables */}
    <TopProductsByRevenueTable data={topProductsData} />

    <RegionalPerformanceTable data={regionalPerformanceData} />
    </div>
  );
}
