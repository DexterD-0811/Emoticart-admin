import { NavLink } from 'react-router';
import logo from '../../../Emoticart.png'; // adjust the path to match your project

export function SideBar() {
  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'products', icon: '📦', label: 'Products' },
    { id: 'category', icon: '🏷️', label: 'Category' },
    { id: 'orders', icon: '🛒', label: 'Orders' },
    { id: 'customers', icon: '👥', label: 'Customers' },
    { id: 'analytics', icon: '📈', label: 'Analytics' },
  ];

  return (
    <nav className="sidebar" id="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-text">
          <img 
            src={logo} 
            alt="Company Logo" 
            className="sidebar-logo" 
          />
          <span>Emoticart</span>
        </div>
      </div>

      <div className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={`/admin/${item.id}`}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
