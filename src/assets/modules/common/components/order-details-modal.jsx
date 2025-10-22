export function OrderDetailsModal({ visible, onClose, children }) {
  if (!visible) return null;

  return (
    <div id="orderDetailsModal" className="modal">
      <div className="modal-content" style={{ maxWidth: "800px" }}>
        <div className="modal-header">
          <h2 id="orderDetailsTitle">Order Details</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div id="orderDetailsContent" style={{ padding: "0 24px 24px 24px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
