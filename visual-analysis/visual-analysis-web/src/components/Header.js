import "../css/header.css";
import TimeDisplay from "../utils/setTime";
import Modal from "./Modal";

function headerLine() {
  let time = TimeDisplay();
  return (
    <div className="headerLine">
      <div className="center-content">
        <Modal />
        <h1>Welcome</h1>
        <p>{time}</p>
      </div>
    </div>
  );
}

export default headerLine;
