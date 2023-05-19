import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import axios from "axios";

const PieChartComponent = ({ Flag }) => {
  //check if melbourne is clicked or sydney is clicked
  let targetGcc = "";
  if (Flag.Melbourne === false && Flag.Sydney === false) {
    targetGcc = "all";
  } else if (Flag.Melbourne === true && Flag.Sydney === false) {
    targetGcc = "melbourne";
  } else if (Flag.Melbourne === false && Flag.Sydney === true) {
    targetGcc = "sydney";
  }

  //get the data from the backend
  const [topicData, setTopicData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://172.26.136.13:8000//api/v1/twitter/topics")
        .then((res) => {
          setTopicData(res.data.data);
        });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  console.log(topicData);

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
  const data = generateRandomData();

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
          radius: [40, 80],
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
