// v1
// import React, { useEffect, useRef } from "react";
// import * as echarts from "echarts";

// const TreeMapComponent = ({ data }) => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const chart = echarts.init(chartRef.current);

//     const option = {
//       title: {
//         text: "Tree map",
//         left: "center",
//         top: "10px",
//         textStyle: {
//           color: "#ff0000", // Set the desired title color here
//         },
//       },
//       series: [
//         {
//           type: "treemap",
//           data: data,
//           leafDepth: 2, // Adjust the depth of the treemap hierarchy
//           visibleMin: 300, // Minimum value for a rectangle to be visible
//           universalTransition: true,
//           label: {
//             show: true,
//             formatter: "{b}", // Display the label as the name of the data item
//           },
//           itemStyle: {
//             borderColor: "#fff", // Border color of each rectangle
//           },
//         },
//       ],
//     };

//     chart.setOption(option);

//     // Resize chart when the window size changes
//     window.addEventListener("resize", () => chart.resize());

//     return () => {
//       window.removeEventListener("resize", () => chart.resize());
//     };
//   }, [data]);

//   return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
// };

// export default TreeMapComponent;

// v2
import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import axios from "axios";

const TreeMapComponent = ({ Flag }) => {
  // console.log(Flag);

  let targetGcc = "sydney";
  if (Flag.Melbourne === false && Flag.Sydney === false) {
    targetGcc = "sydney";
  } else if (Flag.Melbourne === true && Flag.Sydney === false) {
    targetGcc = "melbourne";
  } else if (Flag.Melbourne === false && Flag.Sydney === true) {
    targetGcc = "sydney";
  }

  //get the data from the backend
  const [wcData, setWcData] = useState([]);
  const [gccData, setGccData] = useState([]);
  const [topWordData, setTopWordData] = useState([]);

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

  //find the right gcc data
  // const rightGccData = wcData.data[targetGcc];

  let data;

  if (typeof rightGccData === "undefined") {
    data = [
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
  } else {
    data = Object.entries(rightGccData).map(([name, value]) => ({
      name,
      value,
    }));
  }

  // console.log(data);

  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const option = {
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

    chart.setOption(option);

    // Resize chart when the window size changes
    window.addEventListener("resize", () => chart.resize());

    return () => {
      window.removeEventListener("resize", () => chart.resize());
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
};

export default TreeMapComponent;
