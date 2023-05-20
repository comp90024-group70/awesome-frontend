import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import axios from "axios";

const TreeMapComponent = ({ Flag }) => {
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
  const [wcData, setWcData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://172.26.136.13:8000/api/v1/twitter/treemap")
        .then((res) => {
          setWcData(res.data.data);
        });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const rightGccData = wcData[targetGcc];

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

  //Select Echart treemap component
  const getOption = () => {
    return {
      title: {
        text: "Tree map",
        left: "center",
        top: "10px",
        textStyle: {
          color: "#ff0000", // Set the desired title color here
        },
      },
      series: [
        {
          type: "treemap",
          data: data,
          leafDepth: 2, // Adjust the depth of the treemap hierarchy
          visibleMin: 300, // Minimum value for a rectangle to be visible
          universalTransition: true,
          label: {
            show: true,
            formatter: "{b}", // Display the label as the name of the data item
          },
          itemStyle: {
            borderColor: "#fff", // Border color of each rectangle
          },
        },
      ],
    };
  };
  //   chart.setOption(option);

  //   // Resize chart when the window size changes
  //   window.addEventListener("resize", () => chart.resize());

  //   return () => {
  //     window.removeEventListener("resize", () => chart.resize());
  //   };
  // }, [data]);

  return (
    <ReactECharts
      option={getOption()}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default TreeMapComponent;
