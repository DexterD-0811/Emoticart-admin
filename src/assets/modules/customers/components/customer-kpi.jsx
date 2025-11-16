export function CustomerKPI({
  totalCustomers,
  activeCustomers,
  newCustomers,
  avgLifetimeValue,
  customersGrowth,
  activeGrowth,
  newGrowth,
  clvGrowth,
}) {
  const kpis = [
    {
      title: "Total Customers",
      value: totalCustomers,
      growth: customersGrowth,
      icon: "👥",
      bg: "#d6bcfa",
    },
    {
      title: "Active Customers",
      value: activeCustomers,
      growth: activeGrowth,
      icon: "✅",
      bg: "#c6f6d5",
    },
    {
      title: "New This Month",
      value: newCustomers,
      growth: newGrowth,
      icon: "🆕",
      bg: "#bee3f8",
    },
    {
      title: "Avg. Lifetime Value",
      value: avgLifetimeValue,
      growth: clvGrowth,
      icon: "💰",
      bg: "#fbd38d",
    },
  ];

  return (
    <section
      className="kpi-grid"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        marginBottom: 24,
      }}
    >
      {kpis.map(({ title, value, growth, icon, bg }) => (
        <div key={title} className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">{title}</span>
            <div className="kpi-icon" style={{ background: bg }}>
              {icon}
            </div>
          </div>
          <div className="kpi-value">{value}</div>
          {growth !== undefined && growth !== null && (
            <div
              className={`kpi-change ${
                String(growth).startsWith("-") ? "negative" : "positive"
              }`}
            >
              {growth}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
