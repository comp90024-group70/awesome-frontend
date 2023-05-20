// import React, { useEffect, useState } from "react";
// import ReactECharts from "echarts-for-react";
// import axios from "axios";

// const HorizantalBarChartComponent = ({ data }) => {
//   // Set the chart options
//   const getOption = () => {
//     return {
//       tooltip: {
//         trigger: "axis",
//         axisPointer: {
//           // Use axis to trigger tooltip
//           type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
//         },
//       },
//       title: {
//         text: "Horizontal Bar",
//         left: "center",
//         textStyle: {
//           color: "#ff0000", // Set the desired title color here
//         },
//       },
//       legend: {},
//       grid: {
//         left: "3%",
//         right: "4%",
//         bottom: "3%",
//         containLabel: true,
//       },
//       xAxis: {
//         type: "value",
//       },
//       yAxis: {
//         type: "category",
//         data: data.map((item) => item.name),
//       },
//       series: [
//         {
//           type: "bar",
//           data: data.map((item) => item.value),
//         },
//       ],
//     };
//   };
//   return (
//     <ReactECharts
//       option={getOption()}
//       style={{ width: "100%", height: "100%" }}
//     />
//   );
// };

// export default HorizantalBarChartComponent;

import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import axios from "axios";

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
    const interval = setInterval(() => {
      axios.get("http://172.26.136.13:8000/api/v1/sa4/family").then((res) => {
        setBenefitData(res.data.data);
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
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

  // Set the chart options
  const getOption = () => {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // Use axis to trigger tooltip
          type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
        },
      },
      title: {
        text: "Horizontal Bar",
        left: "center",
        textStyle: {
          color: "#ff0000", // Set the desired title color here
        },
      },
      legend: {},
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
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
          data: data.map((item) => item.value),
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
