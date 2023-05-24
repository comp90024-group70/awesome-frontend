import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { sendRequest } from "./requests";
const HorizantalBarChartComponent = ({ Flag }) => {
  //determine what is clicked
  let targetGcc = "sydney";
  if (
    Flag.Melbourne === false &&
    Flag.Sydney === false &&
    Flag.Perth === false &&
    Flag.Brisbane === false
  ) {
    targetGcc = "sydney";
  } else if (
    Flag.Melbourne === true &&
    Flag.Sydney === false &&
    Flag.Perth === false &&
    Flag.Brisbane === false
  ) {
    targetGcc = "melbourne";
  } else if (
    Flag.Melbourne === false &&
    Flag.Sydney === true &&
    Flag.Perth === false &&
    Flag.Brisbane === false
  ) {
    targetGcc = "sydney";
  } else if (
    Flag.Melbourne === false &&
    Flag.Sydney === false &&
    Flag.Perth === true &&
    Flag.Brisbane === false
  ) {
    targetGcc = "perth";
  } else if (
    Flag.Melbourne === false &&
    Flag.Sydney === false &&
    Flag.Perth === false &&
    Flag.Brisbane === true
  ) {
    targetGcc = "brisbane";
  }

  //get the data from the backend
  const [benefitData, setBenefitData] = useState([]);

  useEffect(() => {
    sendRequest("/sa4/family").then((res) => {
      setBenefitData(res.data.data);
    });
  }, []);

  const rightGccData = benefitData[targetGcc];

  //abtract the right data
  let data;

  if (typeof rightGccData === "undefined") {
    data = [{ name: "loading", value: 0 }];
  } else {
    data = Object.entries(rightGccData).map(([name, value]) => ({
      name,
      value,
    }));
  }

  const getOption = () => {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line",
        },
      },
      title: {
        text: "Benefit Recipients Count(cities)",
        left: "center",
        textStyle: {
          color: "purple",
        },
      },
      legend: {},
      grid: {
        left: "5%",
        right: "5%",
        bottom: "5%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
      },
      yAxis: {
        type: "category",
        data: data.map((item) => item.name),
      },
      series: [
        {
          type: "bar",
          data: data.map((item) => item.value.toFixed(2)),
          color: "#0099ff",
        },
      ],
    };
  };
  return (
    <ReactECharts
      option={getOption()}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default HorizantalBarChartComponent;
