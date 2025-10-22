import { useEffect } from 'react';

export function DashboardPage() {
  const updateDashboard = () => {
    // TODO: Implement dashboard update logic
    console.log("Updating dashboard...");
  };

  const viewAllOrders = () => {
    // TODO: Handle view all orders action
    console.log("View all orders clicked");
  };

  useEffect(() => {
    // TODO: Initialize charts here using canvas refs or Chart.js
    // Populate ordersTableBody and notificationsList if needed
  }, []);

  return (
    <div id="dashboardPage" className="page-section">
      <header className="header">
        <h1>📊 Dashboard Overview</h1>
        <div className="date-filter">
          <label htmlFor="dateRange">Date Range:</label>
          <select id="dateRange" onChange={updateDashboard} defaultValue="week">
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>
      </header>

      <section className="kpi-grid">
        <div className="kpi-card sales">
          <div className="kpi-header">
            <span className="kpi-title">Total Sales</span>
            <div className="kpi-icon" style={{ background: '#c6f6d5' }}>💰</div>
          </div>
          <div className="kpi-value" id="totalSales">$24,580</div>
          <div className="kpi-change positive" id="salesChange">+12.5% from last week</div>
        </div>

        <div className="kpi-card orders">
          <div className="kpi-header">
            <span className="kpi-title">Total Orders</span>
            <div className="kpi-icon" style={{ background: '#bee3f8' }}>📦</div>
          </div>
          <div className="kpi-value" id="totalOrders">1,247</div>
          <div className="kpi-change positive" id="ordersChange">+8.3% from last week</div>
        </div>

        <div className="kpi-card revenue">
          <div className="kpi-header">
            <span className="kpi-title">Total Revenue</span>
            <div className="kpi-icon" style={{ background: '#fbd38d' }}>📈</div>
          </div>
          <div className="kpi-value" id="totalRevenue">$89,420</div>
          <div className="kpi-change positive" id="revenueChange">+15.2% from last week</div>
        </div>

        <div className="kpi-card users">
          <div className="kpi-header">
            <span className="kpi-title">Active Users</span>
            <div className="kpi-icon" style={{ background: '#d6bcfa' }}>👥</div>
          </div>
          <div className="kpi-value" id="activeUsers">3,892</div>
          <div className="kpi-change positive" id="usersChange">+5.7% from last week</div>
        </div>
      </section>

      <section className="charts-grid">
        <div className="chart-container">
          <h3 className="chart-title">Sales Trends</h3>
          <canvas id="salesChart" className="chart-canvas"></canvas>
        </div>

        <div className="chart-container">
          <h3 className="chart-title">Orders by Category</h3>
          <canvas id="categoryChart" className="chart-canvas"></canvas>
        </div>
      </section>

      <div className="chart-container" style={{ marginBottom: '32px' }}>
        <h3 className="chart-title">Top Products</h3>
        <canvas id="productsChart" className="chart-canvas"></canvas>
      </div>

      <section className="orders-section">
        <div className="section-header">
          <h2 className="section-title">Recent Orders</h2>
          <button className="view-all-btn" onClick={viewAllOrders}>View All Orders</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody id="ordersTableBody">
              {/* TODO: Render dynamic rows here */}
            </tbody>
          </table>
        </div>
      </section>

      <section className="notifications">
        <h2 className="section-title" style={{ marginBottom: '20px' }}>Recent Notifications</h2>
        <div id="notificationsList">
          {/* TODO: Render notifications dynamically */}
        </div>
      </section>
    </div>
  );
}
