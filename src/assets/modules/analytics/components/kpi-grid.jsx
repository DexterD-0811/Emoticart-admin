import React from 'react';

export const KPIGrid = ({
  avgOrderValue,
  aovChange,
  customerLTV,
  clvChange,
  conversionRate,
  conversionChange,
  returnRate,
  returnChange,
}) => {
  const kpis = [
    {
      title: 'Average Order Value',
      icon: '💰',
      background: '#c6f6d5',
      value: avgOrderValue,
      change: aovChange,
      idPrefix: 'avgOrderValue',
    },
    {
      title: 'Customer Lifetime Value',
      icon: '👥',
      background: '#bee3f8',
      value: customerLTV,
      change: clvChange,
      idPrefix: 'customerLTV',
    },
    {
      title: 'Conversion Rate',
      icon: '📊',
      background: '#fbd38d',
      value: conversionRate,
      change: conversionChange,
      idPrefix: 'conversionRate',
    },
    {
      title: 'Return Customer Rate',
      icon: '🔄',
      background: '#d6bcfa',
      value: returnRate,
      change: returnChange,
      idPrefix: 'returnRate',
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
          <div className="kpi-change positive" id={`${kpi.idPrefix}Change`}>
            {kpi.change}
          </div>
        </div>
      ))}
    </section>
  );
};
