import "../css/rightBox.css";
import { useContext, useEffect } from "react";
import { PassedFlag } from "../components/MainBox";
import PieChartComponent from "../utils/PieChartComponent";
import TreeMapComponent from "../utils/TreeMapComponent";
import HorizantalBarChartComponent from "../utils/HorizontalBarComponent";

function RightBox() {
  const { flag } = useContext(PassedFlag);
  useEffect(() => {}, [flag]);

  return (
    <div className="rightBox">
      <div className="panelR">
        <div className="chartR">
          <PieChartComponent Flag={flag} />
        </div>
      </div>
      <div className="panelR">
        <h2
          style={{
            color: "purple",
            textAlign: "center",
            marginTop: "5%",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Most Common Words(cities)
        </h2>
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
