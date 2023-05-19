// import React, { useEffect, useRef } from "react";
// import * as echarts from "echarts/core";
// import { PieChart } from "echarts/charts";
// import {
//   TitleComponent,
//   TooltipComponent,
//   LegendComponent,
// } from "echarts/components";
// import { CanvasRenderer } from "echarts/renderers";

// // Register necessary components
// echarts.use([
//   TitleComponent,
//   TooltipComponent,
//   LegendComponent,
//   PieChart,
//   CanvasRenderer,
// ]);

// const PieChartComponent = ({ data }) => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const myChart = echarts.init(chartRef.current);

//     // Set the chart options
//     const options = {
//       title: {
//         text: "Pie Chart",
//         left: "center",
//         textStyle: {
//           color: "#ff0000", // Set the desired title color here
//         },
//       },
//       tooltip: {
//         trigger: "item",
//         formatter: "{b}: {c} ({d}%)",
//       },
//       legend: {
//         orient: "vertical",
//         left: "left",
//         data: data.map((item) => item.name),
//         textStyle: {
//           color: "purple",
//         },
//       },
//       series: [
//         {
//           name: "Nightingale Chart",
//           type: "pie",
//           radius: [40, 80],
//           center: ["60%", "50%"],
//           roseType: "area",
//           data: data,
//         },
//       ],
//     };

//     // Set the chart options to the chart instance
//     myChart.setOption(options);

//     // Clean up on unmount
//     return () => {
//       myChart.dispose();
//     };
//   }, [data]);

//   return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
// };

// export default PieChartComponent;
import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import axios from "axios";

// Register necessary components
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
]);

const PieChartComponent = ({ Flag }) => {
  console.log(Flag);
  //check if melbourne is clicked or sydney is clicked
  let targetGcc = "";
  if (Flag.Melbourne === false && Flag.Sydney === false) {
    targetGcc = "all";
  } else if (Flag.Melbourne === true && Flag.Sydney === false) {
    targetGcc = "melbourne";
  } else if (Flag.Melbourne === false && Flag.Sydney === true) {
    targetGcc = "sydney";
  }

  console.log(targetGcc);
  //get the data from the backend
  const [topicData, setTopicData] = useState([]);
  const [topicGcc, setTopicGcc] = useState([]);
  const [topicSentiment, setTopicSentiment] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://172.26.136.13:8000/api/v1/twitter/topics")
        .then((res) => {
          setTopicData(res.data.data);
        });
    }, 20000);
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

  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    // Set the chart options
    const options = {
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

    // Set the chart options to the chart instance
    myChart.setOption(options);

    // Clean up on unmount
    return () => {
      myChart.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
};

export default PieChartComponent;
