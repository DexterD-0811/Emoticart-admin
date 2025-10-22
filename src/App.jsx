import { createBrowserRouter, RouterProvider } from "react-router";
import { LoginBaseLayout } from "./assets/modules/login/components/login-base-layout";
import { LoginPage } from "./assets/modules/login/pages/login-page";
import { ForgotPassword } from "./assets/modules/login/components/forgot-password";
import { BaseLayout } from "./assets/modules/common/components/base-layout";
import { DashboardPage } from "./assets/modules/dashboard/pages/dashboard-page";
import { ProductsPage } from "./assets/modules/products/pages/products-page";
import { CategoryPage } from "./assets/modules/categories/pages/category-page";
import { OrdersPage } from "./assets/modules/orders/pages/orders-page";
import { CustomersPage } from "./assets/modules/customers/pages/customers-page";
import { AnalyticsPage } from "./assets/modules/analytics/pages/analytics-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginBaseLayout />,
    children: [
      {
        index: true, 
        element: <LoginPage />,
      },
      {
        path: "forgotpassword",
        element: <ForgotPassword />,
      }
    ],
  },
  {
    path: "/admin",
    element: <BaseLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "category",
        element: <CategoryPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "customers",
        element: <CustomersPage />,
      },
      {
        path: "analytics",
        element: <AnalyticsPage />,
      }
    ],
  }
]);

export function App() {

  return <RouterProvider router={router} />;
}
