import "../css/rightBox.css";
import { useContext, useEffect } from "react";
import { PassedFlag } from "../components/MainBox";
import PieChartComponent from "../utils/PieChartComponent";
import LineChartComponent from "../utils/LineChartComponent";
import StackAreaChartComponent from "../utils/StackAreaChartComponent";

function RightBox() {
  const { flag } = useContext(PassedFlag);
  // const { val } = props
  useEffect(() => {
    console.log(flag);
  }, [flag]);

  //generate a pie fake data
  const generateRandomData = () => {
    const categories = [
      "Category 1",
      "Category 2",
      "Category 3",
      "Category 4",
      "Category 5",
    ];
    return categories.map((category) => ({
      name: category,
      value: Math.floor(Math.random() * 100),
    }));
  };
  const fakeDataPie = generateRandomData();

  //fake line chart data
  const fakeLineChartData = {
    xAxisData: ["Jan", "Feb", "Mar", "Apr", "May"],
    seriesData: [820, 932, 901, 934, 1290],
  };

  //fake Stack Area Chart component
  const fakeStackAreaChartData = {
    legendData: ["Series A", "Series B", "Series C"],
    xAxisData: ["Jan", "Feb", "Mar", "Apr", "May"],
    seriesData: [
      {
        name: "Series A",
        data: [820, 932, 901, 934, 1290],
      },
      {
        name: "Series B",
        data: [620, 732, 701, 734, 1090],
      },
      {
        name: "Series C",
        data: [320, 432, 501, 534, 990],
      },
    ],
  };

  return (
    <div className="rightBox">
      <div className="panelR">
        <div className="chartR">
          <PieChartComponent data={fakeDataPie} />
        </div>
        <div className="panelfooterR"> </div>
      </div>
      <div className="panelR">
        <div className="lineR">
          <LineChartComponent data={fakeLineChartData} />
        </div>
        <div className="panelfooterR"> </div>
      </div>
      <div className="panelR">
        <h2>某图关于drugs</h2>
        <div className="pieR">
          <StackAreaChartComponent data={fakeStackAreaChartData} />
        </div>
        <div className="panelfooterR"> </div>
      </div>
    </div>
  );
}

export default RightBox;
