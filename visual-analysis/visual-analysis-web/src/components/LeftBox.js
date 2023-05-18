import "../css/leftBox.css";
import { useContext, useEffect } from "react";
import { PassedFlag } from "../components/MainBox";
import { StateBarChart } from "../utils/StateBarChart";
import TreeMapComponent from "../utils/TreeMapComponent";
import WordCloudComponent from "../utils/WordCloudComponent";

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

  return (
    <div className="leftBox">
      <div className="panelL">
        <h2>avg sentiment</h2>
        <div className="chartL">
          <ExactBarChartL />
        </div>
        <div className="panelfooterL"></div>
      </div>
      <div className="panelL">
        <h2>某图关于drugs</h2>
        <div className="lineL">
          <TreeMapComponent data={fakeTreeMapData} />
        </div>
        <div className="panelfooterL"> </div>
      </div>
      <div className="panelL">
        <h2>某图关于drugs</h2>
        <div className="pieL">
          <WordCloudComponent data={fakeWordCloudData} />
        </div>
        <div className="panelfooterL"> </div>
      </div>
    </div>
  );
}

export default LeftBox;
