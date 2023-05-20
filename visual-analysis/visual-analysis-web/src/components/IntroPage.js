import React, { useState } from "react";
import { animated } from "react-spring";
// import "../css/introPage.css";
function IntroPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="IntroPage">
      <button className="button" onClick={() => setShowModal(true)}>
        about us
      </button>

      {showModal && (
        <div className="IntroPage">
          <animated.div className="IntroPage-content">
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
export default IntroPage;
