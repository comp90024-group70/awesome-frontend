import React, { useState } from "react";
import "../css/introPage.css";
import Image from "../images/overview.png";

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
              style={{ width: "600px", height: "600px" }}
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
