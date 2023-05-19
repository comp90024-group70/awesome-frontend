import "../css/leftBox.css";
import { useContext, useEffect } from "react";
import { PassedFlag } from "../components/MainBox";
import { StateBarChart } from "../utils/StateBarChart";
import HorizantalBarChartComponent from "../utils/HorizontalBarComponent";
import LineChartComponent from "../utils/LineChartComponent";

function LeftBox() {
  const { flag } = useContext(PassedFlag);
  // const { val } = props
  useEffect(() => {
    console.log(flag);
  }, [flag]);

  let ExactBarChartL;
  // let ExactLineChartL
  // let ExactPieChartL
  if (flag.Melbourne === false && flag.Sydney === false) {
    ExactBarChartL = StateBarChart;
  } else if (flag.Melbourne === true && flag.Sydney === false) {
    // ExactBarChartL = MelbourneChart
  } else if (flag.Melbourne === false && flag.Sydney === true) {
    // ExactBarChartL = SydneyChart
  }

  const fakeWordCloudData = [
    { name: "Lorem", value: 10 },
    { name: "Ipsum", value: 8 },
    { name: "Dolor", value: 6 },
    { name: "Sit", value: 7 },
    { name: "Amet", value: 9 },
    { name: "Consectetur", value: 5 },
    { name: "Adipiscing", value: 4 },
    { name: "Elit", value: 7 },
    { name: "Sed", value: 6 },
    { name: "Eiusmod", value: 8 },
    { name: "Tempor", value: 5 },
    { name: "Incididunt", value: 7 },
    // Add more word objects as needed
  ];

  //Fake treemap data
  const fakeTreeMapData = [
    { name: "Lorem", value: 10 },
    { name: "Ipsum", value: 8 },
    { name: "Dolor", value: 6 },
    { name: "Sit", value: 7 },
    { name: "Amet", value: 9 },
    { name: "Consectetur", value: 5 },
    { name: "Adipiscing", value: 4 },
    { name: "Elit", value: 7 },
    { name: "Sed", value: 6 },
    { name: "Eiusmod", value: 8 },
    { name: "Tempor", value: 5 },
    { name: "Incididunt", value: 7 },
    // Add more data items as needed
  ];

  //Fake horizental bar chart component
  const fakeHorizentalBarData = [
    { name: "Mon", value: 320 },
    { name: "Tue", value: 480 },
    { name: "Wed", value: 200 },
    { name: "Thu", value: 600 },
    { name: "Fri", value: 350 },
    { name: "Sat", value: 800 },
    { name: "Sun", value: 400 },
  ];

  //fake line chart data
  const fakeLineChartData = {
    xAxisData: ["Jan", "Feb", "Mar", "Apr", "May"],
    seriesData: [820, 932, 901, 934, 1290],
  };

  return (
    <div className="leftBox">
      <div className="panelL">
        <h2>avg sentiment</h2>
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
          <HorizantalBarChartComponent data={fakeHorizentalBarData} />
        </div>
      </div>
    </div>
  );
}

export default LeftBox;
