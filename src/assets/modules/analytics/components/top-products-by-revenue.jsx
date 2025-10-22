export const TopProductsByRevenueTable = ({ data }) => {
  return (
    <div
      className="analytics-table-container"
      style={{ maxHeight: 300, overflowY: "auto", marginBottom: 24 }}
    >
      <h4>Top Products by Revenue</h4>
      <table className="analytics-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map(({ product, revenue }, index) => (
              <tr key={index}>
                <td>{product}</td>
                <td>{revenue}</td>
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