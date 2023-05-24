import "../css/leftBox.css";
import { useContext, useEffect } from "react";
import { PassedFlag } from "../components/MainBox";
import { StateBarChart } from "../utils/StateBarChart";
import LineChartComponent from "../utils/LineChartComponent";
import ShowTextInTime from "../utils/ShowTextInTime";

function LeftBox() {
  const { flag } = useContext(PassedFlag);
  useEffect(() => {}, [flag]);

  let ExactBarChartL;
  ExactBarChartL = StateBarChart;

  return (
    <div className="leftBox">
      <div className="panelL">
        <div className="chartL">
          <ExactBarChartL />
        </div>
      </div>
      <div className="panelL">
        <div className="lineL">
          <LineChartComponent />
        </div>
      </div>
      <div className="panelL">
        <div className="pieL">
          <ShowTextInTime />
        </div>
      </div>
    </div>
  );
}

export default LeftBox;
