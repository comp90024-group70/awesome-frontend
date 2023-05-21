import React, { useState } from "react";
import "../css/introPage.css";
import Image from "../images/background.jpg";

function IntroPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="IntroPage">
      <button className="button" onClick={() => setShowModal(true)}>
        Overview
      </button>

      {showModal && (
        <div className="introPage">
          <div
            className="introPage-content"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={Image}
              alt="Overview"
              style={{ width: "500px", height: "500px" }}
            />
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
