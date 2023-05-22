import "../css/rightBox.css";
import { useContext, useEffect } from "react";
import { PassedFlag } from "../components/MainBox";
import PieChartComponent from "../utils/PieChartComponent";
import TreeMapComponent from "../utils/TreeMapComponent";
import HorizantalBarChartComponent from "../utils/HorizontalBarComponent";

function RightBox() {
  const { flag } = useContext(PassedFlag);
  useEffect(() => {
    console.log(flag);
  }, [flag]);

  return (
    <div className="rightBox">
      <div className="panelR">
        <div className="chartR">
          <PieChartComponent Flag={flag} />
        </div>
      </div>
      <div className="panelR">
        <div className="lineR">
          <TreeMapComponent Flag={flag} />
        </div>
      </div>
      <div className="panelR">
        <div className="pieR">
          <HorizantalBarChartComponent Flag={flag} />
        </div>
      </div>
    </div>
  );
}

export default RightBox;
