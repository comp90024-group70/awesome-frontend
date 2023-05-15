import "../css/mainBox.css";
import LeftBox from "./LeftBox";
import MidBox from "./MidBox";
import RightBox from "./RightBox";
function MainBox() {
  return (
    <div className="mainBox">
      <LeftBox />
      <MidBox />
      <RightBox />
    </div>
  );
}

export default MainBox;
