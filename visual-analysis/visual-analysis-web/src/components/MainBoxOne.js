import "../css/mainBox.css";
import LeftBox from "./LeftBox";
import MidBox from "./MidBox";
import RightBox from "./RightBox";
import { useState, createContext } from "react";

export const PassedFlag = createContext();
function MainBoxOne() {
  const [flag, setFlag] = useState({
    Melbourne: false,
    Sydney: false,
    Perth: false,
  });
  return (
    <PassedFlag.Provider value={{ flag, setFlag }}>
      <div className="mainBox">
        <MidBox />
        <RightBox />
      </div>
    </PassedFlag.Provider>
  );
}

export default MainBoxOne;
