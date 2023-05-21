import React, { useState } from "react";
import { animated } from "react-spring";
import "../css/introPage.css";
function IntroPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="IntroPage">
      <button className="button" onClick={() => setShowModal(true)}>
        Overview
      </button>

      {showModal && (
        <div className="introPage">
          <div className="introPage-content">
            <img src="../images/background.jpg" alt="My Image" />
            <button className="button" onClick={() => setShowModal(false)}>
              close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default IntroPage;
