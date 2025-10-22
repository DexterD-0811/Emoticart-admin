import { useState } from 'react';
import { Link } from 'react-router';

export function SideBar() {
  const [activeNav, setActiveNav] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'products', icon: '📦', label: 'Products' },
    { id: 'category', icon: '🏷️', label: 'Category' },
    { id: 'orders', icon: '🛒', label: 'Orders' },
    { id: 'customers', icon: '👥', label: 'Customers' },
    { id: 'analytics', icon: '📈', label: 'Analytics' },
  ];

  const handleNavClick = (id) => {
    setActiveNav(id);
    console.log(`Navigated to ${id}`);
  };

  return (
    <nav className="sidebar" id="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          🏢 <span>Dashboard</span>
        </div>
      </div>

      <div className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={`/admin/${item.id}`}
            className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
            onClick={() => 
              handleNavClick(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
