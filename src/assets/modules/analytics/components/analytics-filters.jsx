export function AnalyticsFilters({ updateAnalytics, resetAnalyticsFilters, showCustomDateRange }) {
  return (
    <div className="filters-section">
      <div
        className="filter-group"
        style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
      >
        {/* ... other filters unchanged ... */}

        <select
          id="analyticsDateRange"
          className="filter-select"
          onChange={updateAnalytics}
          defaultValue="30days"
        >
          {/* options */}
        </select>

        {/* ... other selects */}

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
