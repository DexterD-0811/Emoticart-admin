import { useState } from 'react';
import { useNavigate } from 'react-router';

export function TopNav() {
  const [searchValue, setSearchValue] = useState('');
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'
  const navigate = useNavigate();

  const toggleSidebar = () => {
    // implement sidebar toggle logic
    console.log('Sidebar toggled');
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    console.log('Search:', value);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLogout = () => {
    // implement logout logic
    console.log('Logout clicked');
    navigate('/');
  };

  return (
    <>
      <button
        className="mobile-menu-btn"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      <div className="top-nav">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search products, orders, customers..."
            id="searchInput"
            value={searchValue}
            onInput={handleSearch}
          />
        </div>

        <div className="top-nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} id="themeToggle">
            <span id="themeIcon">{theme === 'dark' ? '🌙' : '☀️'}</span>
            <span id="themeText">{theme === 'dark' ? 'Dark' : 'Light'}</span>
          </button>

          <button className="logout-btn" onClick={handleLogout}>
            <span>🚪</span>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
