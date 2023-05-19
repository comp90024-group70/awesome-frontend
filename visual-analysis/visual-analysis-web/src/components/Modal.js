import React, { useState } from "react";
import { animated } from "react-spring";
import "../css/modal.css";
function Modal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="Modal">
      <button className="button" onClick={() => setShowModal(true)}>
        about us
      </button>

      {showModal && (
        <div className="modal">
          <animated.div className="modal-content">
            <h1>xxx</h1>
            <h1>xxx</h1>
            <h1>xxx</h1>
            <h1>xxx</h1>
            <h1>xxx</h1>
            <h1>xxx</h1>
            <button className="button" onClick={() => setShowModal(false)}>
              close
            </button>
          </animated.div>
        </div>
      )}
    </div>
  );
}
export default Modal;
