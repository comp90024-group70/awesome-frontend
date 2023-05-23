import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { sendRequest } from "./requests";

const PieChartComponent = ({ Flag }) => {
  //check what is being clicked
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
  const [topicData, setTopicData] = useState([]);
  useEffect(() => {
    sendRequest("/twitter/topics", { topic: "cov" }).then((res) => {
      setTopicData(res.data.data);
    });
  }, []);

  const rightGccData = topicData[targetGcc];

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

  // Set the chart options
  const getOption = () => {
    return {
      title: {
        text: "Sentiment Analysis(cities)",
        left: "center",
        textStyle: {
          color: "purple",
        },
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: data.map((item) => item.name),
        textStyle: {
          color: "purple",
        },
      },
      series: [
        {
          name: "Nightingale Chart",
          type: "pie",
          radius: [30, 50],
          center: ["60%", "50%"],
          roseType: "area",
          data: data,
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

export default PieChartComponent;
