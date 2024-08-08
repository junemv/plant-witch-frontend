import React from "react";
import "./Modal.css";
const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <div className="close" onClick={onClose}>
          &times;
        </div>
      </div>
    </div>
  );
};

export default Modal;
