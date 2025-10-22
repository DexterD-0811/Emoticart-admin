export function CustomerDetailsModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div id="customerDetailsModal" className="modal" style={{ display: "block" }}>
      <div className="modal-content" style={{ maxWidth: 900 }}>
        <div className="modal-header">
          <h2 id="customerDetailsTitle">Customer Details</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div id="customerDetailsContent" style={{ padding: "0 24px 24px 24px" }}>
          {children /* Customer details content */}
        </div>
      </div>
    </div>
  );
}
