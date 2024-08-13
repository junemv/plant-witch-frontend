import React from "react";
import "./Modal.css";
const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <div className="close" onClick={onClose}>
          &times;
        </div>
      </div>
    </div>
  );
};

export default Modal;
