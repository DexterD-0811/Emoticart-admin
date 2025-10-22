export const RegionalPerformanceTable = ({ data }) => {
  return (
    <div
      className="analytics-table-container"
      style={{ maxHeight: 300, overflowY: "auto", marginBottom: 24 }}
    >
      <h4>Regional Performance</h4>
      <table className="analytics-table">
        <thead>
          <tr>
            <th>Region</th>
            <th>Revenue</th>
            <th>Orders</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map(({ region, revenue, orders }, index) => (
              <tr key={index}>
                <td>{region}</td>
                <td>{revenue}</td>
                <td>{orders}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};