import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import axios from "axios";
import {sendRequest} from "./requests";

const PieChartComponent = ({ Flag }) => {
  console.log(Flag);
  //check if melbourne is clicked or sydney is clicked
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
    sendRequest("/twitter/topics", {"topic": "cov"}).then((res) => {
      setTopicData(res.data.data);
    });
  }, [])
  // useEffect(() => {
  //   let domain = process.env.REQUEST_DOMAIN;
  //   if (domain === undefined) {
  //     domain = 'http://172.26.131.154/';
  //   }
  //   axios
  //       .get(`http://${domain}:8000/api/v1/twitter/topics?topic=cov`)
  //       .then((res) => {
  //         setTopicData(res.data.data);
  //       });
  // }, [])
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     axios
  //       .get("http://172.26.136.13:8000//api/v1/twitter/topics?topic=cov")
  //       .then((res) => {
  //         setTopicData(res.data.data);
  //       });
  //   }, 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  const rightGccData = topicData[targetGcc];

  console.log(rightGccData);
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
        text: "Pie Chart",
        left: "center",
        textStyle: {
          color: "#ff0000", // Set the desired title color here
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
          center: ["60%", "60%"],
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
