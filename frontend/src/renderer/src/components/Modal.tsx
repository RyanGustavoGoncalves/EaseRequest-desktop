import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import './css/Modal.css'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modalComp">
        <div className="btnModalClose">
          <button className="modal-close" onClick={onClose}>
            Fechar
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
