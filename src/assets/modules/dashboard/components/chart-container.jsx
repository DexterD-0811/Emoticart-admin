export function ChartContainer({ title, chartId }) {
  return (
    <div className="chart-container">
      <h3 className="chart-title">{title}</h3>
      <canvas id={chartId} className="chart-canvas"></canvas>
    </div>
  );
}
