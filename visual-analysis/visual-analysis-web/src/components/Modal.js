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
          <div className="modal-content">
            <h3>Zian Wang 1225523</h3>
            <h3>Zhichen Ren 1323624</h3>
            <h3>Chenghan Lin 1011576</h3>
            <h3>Xingjian Zhang 991456</h3>
            <h3>Yinuo Sun 1045919</h3>
            {/* <h1>xxx</h1>
            <h1>xxx</h1> */}
            <button className="button" onClick={() => setShowModal(false)}>
              close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Modal;
