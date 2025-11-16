import { useState } from 'react';
import { useNavigate } from 'react-router';

export function TopNav() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const toggleSidebar = () => {
    console.log('Sidebar toggled');
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    console.log('Search:', e.target.value);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    navigate('/');
  };

  return (
    <>
      <button className="mobile-menu-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <div className="top-nav">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search products, orders, customers..."
            value={searchValue}
            onInput={handleSearch}
          />
        </div>

        <div className="top-nav-actions">
          <button className="logout-btn" onClick={handleLogout}>
            <span>🚪</span>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
