import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const AustraliaMapComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const ROOT_PATH = "https://echarts.apache.org/examples";

    chart.showLoading();
    fetch(ROOT_PATH + "/data/asset/geo/USA.json")
      .then((response) => response.json())
      .then((usaJson) => {
        chart.hideLoading();
        echarts.registerMap("USA", usaJson, {
          Alaska: {
            left: -131,
            top: 25,
            width: 15,
          },
          Hawaii: {
            left: -110,
            top: 28,
            width: 5,
          },
          "Puerto Rico": {
            left: -76,
            top: 26,
            width: 2,
          },
        });

        const data = [
          { name: "Alabama", value: 4822023 },
          // ... (remaining data entries)
          { name: "Puerto Rico", value: 3667084 },
        ];
        data.sort(function (a, b) {
          return a.value - b.value;
        });

        const mapOption = {
          visualMap: {
            left: "right",
            min: 500000,
            max: 38000000,
            inRange: {
              color: [
                "#313695",
                "#4575b4",
                "#74add1",
                "#abd9e9",
                "#e0f3f8",
                "#ffffbf",
                "#fee090",
                "#fdae61",
                "#f46d43",
                "#d73027",
                "#a50026",
              ],
            },
            text: ["High", "Low"],
            calculable: true,
          },
          series: [
            {
              id: "population",
              type: "map",
              roam: true,
              map: "USA",
              animationDurationUpdate: 1000,
              universalTransition: true,
              data: data,
            },
          ],
        };

        const barOption = {
          xAxis: {
            type: "value",
          },
          yAxis: {
            type: "category",
            axisLabel: {
              rotate: 30,
            },
            data: data.map(function (item) {
              return item.name;
            }),
          },
          animationDurationUpdate: 1000,
          series: {
            type: "bar",
            id: "population",
            data: data.map(function (item) {
              return item.value;
            }),
            universalTransition: true,
          },
        };

        let currentOption = mapOption;
        chart.setOption(mapOption);

        setInterval(function () {
          currentOption = currentOption === mapOption ? barOption : mapOption;
          chart.setOption(currentOption, true);
        }, 2000);
      });

    // Resize chart when the window size changes
    window.addEventListener("resize", () => chart.resize());

    return () => {
      window.removeEventListener("resize", () => chart.resize());
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
};

export default AustraliaMapComponent;
