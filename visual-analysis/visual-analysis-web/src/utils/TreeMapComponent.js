import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { sendRequest } from "./requests";
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
    sendRequest("/twitter/treemap").then((res) => {
      setWcData(res.data.data);
    });
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

  const getOption = () => {
    return {
      series: [
        {
          type: "treemap",
          data: data,
          leafDepth: 3,
          visibleMin: 30,
          universalTransition: true,
          label: {
            show: true,
            formatter: "{b}",
          },
          itemStyle: {
            borderColor: "#fff",
          },
        },
      ],
    };
  };

  return (
    <ReactECharts
      option={getOption()}
      style={{ width: "100%", height: "90%" }}
    />
  );
};

export default TreeMapComponent;
