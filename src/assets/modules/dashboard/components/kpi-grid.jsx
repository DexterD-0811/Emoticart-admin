export function KpiGrid({ totalRevenue, totalOrders, totalCustomer }) {
  const kpis = [
    {
      title: 'Total Sales',
      value: totalRevenue ? `$${totalRevenue.toFixed(2)}` : '$0.00',
      icon: '💰',
      bg: '#c6f6d5',
      id: 'sales'
    },
    {
      title: 'Total Orders',
      value: totalOrders || 0,
      icon: '📦',
      bg: '#bee3f8',
      id: 'orders'
    },
    {
      title: 'Active Users',
      value: totalCustomer || 0,
      icon: '👥',
      bg: '#d6bcfa',
      id: 'users'
    },
  ];

  return (
    <section className="kpi-grid">
      {kpis.map(kpi => (
        <div key={kpi.id} className={`kpi-card ${kpi.id}`}>
          <div className="kpi-header">
            <span className="kpi-title">{kpi.title}</span>
            <div className="kpi-icon" style={{ background: kpi.bg }}>
              {kpi.icon}
            </div>
          </div>
          <div className="kpi-value">{kpi.value}</div>
          <div className="kpi-change positive">{kpi.change}</div>
        </div>
      ))}
    </section>
  );
}
