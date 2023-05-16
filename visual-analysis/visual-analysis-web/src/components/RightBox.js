import "../css/rightBox.css";
import BarChartComponent from "../utils/BarChartComponent";
import PieChartComponent from "../utils/PieChartComponent";

function RightBox() {
  //generate a bar fake data
  const categories = [
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
  ];
  const values = Array.from({ length: categories.length }, () =>
    Math.floor(Math.random() * 100)
  );
  const fakeDataBar = { categories, values };

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

  return (
    <div className="rightBox">
      <div className="panelR">
        <div className="chartR">
          <PieChartComponent
            data={fakeDataPie}
            style={{ height: "80%", width: "80%" }}
          />
        </div>
        <div className="panelfooterR"> </div>
      </div>
      <div className="panelR">
        <h2>某图关于drugs</h2>
        <div className="lineR">图表</div>
        <div className="panelfooterR"> </div>
      </div>
      <div className="panelR">
        <div className="pieR">
          <BarChartComponent
            data={fakeDataBar}
            style={{ height: "80%", width: "80%" }}
          />
        </div>
        <div className="panelfooterR"> </div>
      </div>
    </div>
  );
}

export default RightBox;
