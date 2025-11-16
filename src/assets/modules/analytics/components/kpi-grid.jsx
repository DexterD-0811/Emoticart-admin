import React from 'react';

export const KPIGrid = ({
  avgOrderValue,
  aovChange,
  lifetimeValue,
  orderFulfillmentRate,
}) => {
  const kpis = [
    {
      title: 'Average Order Value',
      icon: '💰',
      background: '#c6f6d5',
      value: avgOrderValue,
      idPrefix: 'avgOrderValue',
    },
    {
      title: 'Customer Lifetime Value',
      icon: '👥',
      background: '#bee3f8',
      value: lifetimeValue,
      idPrefix: 'customerLTV',
    },
    {
      title: 'Total Sales',
      icon: '📈',
      background: '#fbd38d',
      value: aovChange,
      idPrefix: 'totalSales',
    },
    {
      title: 'Order Fulfillment Rate',
      icon: '✅',
      background: '#d6bcfa',
      value: orderFulfillmentRate,
      idPrefix: 'orderFulfillmentRate',
    },
  ];

  return (
    <section
      className="kpi-grid"
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}
    >
      {kpis.map((kpi) => (
        <div className="kpi-card" key={kpi.title.toLowerCase().replace(/\s+/g, '-')}>
          <div className="kpi-header">
            <span className="kpi-title">{kpi.title}</span>
            <div className="kpi-icon" style={{ background: kpi.background }}>
              {kpi.icon}
            </div>
          </div>
          <div className="kpi-value" id={kpi.idPrefix}>{kpi.value}</div>
        </div>
      ))}
    </section>
  );
};
