export function AnalyticsFilters({ updateAnalytics, resetAnalyticsFilters, showCustomDateRange, categories = [], regions = [] }) {
  return (
    <div className="filters-section">
      <div
        className="filter-group"
        style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}
      >
        <select
          id="analyticsDateRange"
          className="filter-select"
          onChange={updateAnalytics}
          defaultValue="30days"
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
          <option value="lastYear">Last Year</option>
          <option value="custom">Custom Range</option>
        </select>

        <select
          id="analyticsCategoryFilter"
          className="filter-select"
          onChange={updateAnalytics}
          defaultValue=""
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          id="analyticsRegionFilter"
          className="filter-select"
          onChange={updateAnalytics}
          defaultValue=""
        >
          <option value="">All Regions</option>
          {regions.map((region) => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>

        <button className="view-all-btn" onClick={resetAnalyticsFilters}>
          Reset Filters
        </button>
      </div>

      {showCustomDateRange && (
        <div
          id="customDateRange"
          style={{ marginTop: 12, gap: 12, display: "flex" }}
        >
          <input
            type="date"
            id="analyticsDateFrom"
            className="filter-input"
            onChange={updateAnalytics}
            style={{ width: 200 }}
          />
          <input
            type="date"
            id="analyticsDateTo"
            className="filter-input"
            onChange={updateAnalytics}
            style={{ width: 200 }}
          />
        </div>
      )}
    </div>
  );
}
