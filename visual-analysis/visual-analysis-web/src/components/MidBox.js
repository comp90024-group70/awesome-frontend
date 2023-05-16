import "../css/midBox.css";
import Map from "../utils/Map";
import MapComponent from "../utils/MapComponent";

function MidBox() {
  return (
    <div className="midBox">
      <div className="number">
        <div className="numberHeader">
          <ul>
            <li>123456</li>
            <li>123456</li>
          </ul>
        </div>
        <div className="numberBody">
          <ul>
            <li>drugs</li>
            <li>drugs</li>
          </ul>
        </div>
      </div>
      <Map />
    </div>
  );
}

export default MidBox;
