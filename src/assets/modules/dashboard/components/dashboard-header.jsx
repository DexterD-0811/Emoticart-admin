export function DashboardHeader({ onDateChange }) {
  const handleChange = (e) => {
    const value = e.target.value;
    onDateChange(value);
  };

  return (
    <header className="header">
      <h1>📊 Dashboard Overview</h1>
      <div className="date-filter">
        <label htmlFor="dateRange">Date Range:</label>
        <select id="dateRange" onChange={handleChange} defaultValue="week">
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
        </select>
      </div>
    </header>
  );
}
