export const TopBuyersTable = ({ stats }) => {
  const topStats = stats?.slice(0, 3) || [];

  return (
    <div
      className="analytics-table-container"
      style={{ maxHeight: 300, overflowY: "auto", marginBottom: 24 }}
    >
      <h4 className="chart-title">🎩Top Buyers</h4>
      <table className="analytics-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Total Spend</th>
          </tr>
        </thead>
        <tbody>
          {topStats.length > 0 ? (
            topStats.map(({ _id, name, totalSpent }) => (
              <tr key={_id}>
                <td>{name}</td>
                <td>${totalSpent.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
