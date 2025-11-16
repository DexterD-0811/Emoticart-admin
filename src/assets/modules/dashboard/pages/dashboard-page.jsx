import { useEffect, useState, useMemo } from 'react';
import { DashboardHeader } from '../components/dashboard-header';
import { KpiGrid } from '../components/kpi-grid';
import { ChartsGrid } from '../components/charts-grid';
import { TopProductsChart } from '../components/top-products-chart';
import { useOrder } from '../../common/hooks/use-order';
import { useCustomer } from '../../common/hooks/use-customer';
import { useProduct } from '../../common/hooks/use-product';

export function DashboardPage() {
  const {
    allOrders,
    data: orders = [],
    isPending,
    isFailed,
    isSuccess,
  } = useOrder();

  const {
    allCustomers,
    data: customers = [],
    isPending: isCustomerPending,
    isFailed: isCustomerFailed,
    isSuccess: isCustomerSuccess,
  } = useCustomer();

  const {
    allProducts,
    data: products = [],
    isPending: isProductPending,
    isFailed: isProductFailed,
    isSuccess: isProductSuccess,
  } = useProduct();

  const [dateFilter, setDateFilter] = useState('week');

  useEffect(() => {
    allOrders();
    allCustomers();
    allProducts();
  }, [allOrders, allCustomers, allProducts]);

  // 🧠 Filtering logic based on date range
  const filteredOrders = useMemo(() => {
    const now = new Date();

    return orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      if (isNaN(orderDate)) return false; // safety guard

      switch (dateFilter) {
        case 'today': {
          return orderDate.toDateString() === now.toDateString();
        }
        case 'week': {
          const startOfWeek = new Date(now);
          startOfWeek.setDate(now.getDate() - now.getDay());
          return orderDate >= startOfWeek;
        }
        case 'month': {
          return (
            orderDate.getMonth() === now.getMonth() &&
            orderDate.getFullYear() === now.getFullYear()
          );
        }
        case 'quarter': {
          const currentQuarter = Math.floor(now.getMonth() / 3);
          const orderQuarter = Math.floor(orderDate.getMonth() / 3);
          return (
            orderQuarter === currentQuarter &&
            orderDate.getFullYear() === now.getFullYear()
          );
        }
        default:
          return true;
      }
    });
  }, [orders, dateFilter]);

  const filteredProducts = useMemo(() => {
    const now = new Date();

    return products.filter((product) => {
      const productDate = new Date(product.createdAt);
      if (isNaN(productDate)) return false;

      switch (dateFilter) {
        case 'today':
          return productDate.toDateString() === now.toDateString();
        case 'week': {
          const startOfWeek = new Date(now);
          startOfWeek.setDate(now.getDate() - now.getDay());
          return productDate >= startOfWeek;
        }
        case 'month':
          return (
            productDate.getMonth() === now.getMonth() &&
            productDate.getFullYear() === now.getFullYear()
          );
        case 'quarter': {
          const currentQuarter = Math.floor(now.getMonth() / 3);
          const productQuarter = Math.floor(productDate.getMonth() / 3);
          return productQuarter === currentQuarter &&
                productDate.getFullYear() === now.getFullYear();
        }
        default:
          return true;
      }
    });
  }, [products, dateFilter]);

  // Customer data
  const totalCustomer = customers.length;

  // 💰 KPI Calculations
  const totalRevenue = filteredOrders.reduce(
    (sum, order) => sum + (order.totalPrice || 0),
    0
  );
  const totalOrders = filteredOrders.length;

  const updateDashboard = (range) => {
    console.log(`Filtering dashboard for: ${range}`);
    setDateFilter(range);
  };

  const viewAllOrders = () => {
    console.log('View all orders clicked');
  };

  return (
    <div id="dashboardPage" className="page-section">
      <DashboardHeader onDateChange={updateDashboard} />

      <KpiGrid 
      totalRevenue={totalRevenue} 
      totalOrders={totalOrders} 
      totalCustomer={totalCustomer} 
      />

      <ChartsGrid 
        orders={filteredOrders}
        products={filteredProducts}
      />
      
      <TopProductsChart 
      orders={filteredOrders} 
      products={filteredProducts} 
      />

    </div>
  );
}
