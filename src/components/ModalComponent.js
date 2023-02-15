import React from "react";
import PropTypes from "prop-types";

const Modal = ({ handleClose, children }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={handleClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;

