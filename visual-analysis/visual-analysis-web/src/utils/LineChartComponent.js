//v1
// import React, { useEffect, useRef } from "react";
// import * as echarts from "echarts";

// const LineChartComponent = ({ data }) => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const chartDom = chartRef.current;
//     const myChart = echarts.init(chartDom);

//     const option = {
//       title: {
//         text: "Line Chart",
//         left: "center",
//         textStyle: {
//           color: "#ff0000", // Set the desired title color here
//         },
//       },
//       tooltip: {
//         trigger: "axis",
//       },
//       xAxis: {
//         type: "category",
//         data: data.xAxisData,
//       },
//       yAxis: {
//         type: "value",
//       },
//       series: [
//         {
//           type: "line",
//           data: data.seriesData,
//         },
//       ],
//     };

//     myChart.setOption(option);

//     return () => {
//       myChart.dispose();
//     };
//   }, [data]);

//   return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
// };

// export default LineChartComponent;

//v2
// import React, { useEffect, useRef, useState } from "react";
// import * as echarts from "echarts";
// import axios from "axios";

// const LineChartComponent = () => {
//   // get the job data from ADO
//   const [jobData, setJobData] = useState([]);
//   const [jobDate, setJobDate] = useState([]);
//   const [jobCount, setJobCount] = useState([]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       axios.get("http://172.26.136.13:8000/api/v1/ado/job").then((res) => {
//         setJobData(res.data.data);
//       });
//     }, 10000);
//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   const jobDataMonth = {};
//   jobData.forEach((element) => {
//     if (jobDataMonth[element.date[5]]) {
//       jobDataMonth[element.date[5]] += element.total;
//     } else {
//       jobDataMonth[element.date[5]] = element.total;
//     }
//   });

//   //get the family data from ADO
//   const [famData, setFamData] = useState([]);
//   const [famDate, setFamDate] = useState([]);
//   const [famCount, setFamCount] = useState([]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       axios.get("http://172.26.136.13:8000/api/v1/ado/family").then((res) => {
//         setFamData(res.data.data);
//       });
//     }, 10000);
//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   const famDataMonth = {};
//   famData.forEach((element) => {
//     if (famDataMonth[element.date[5]]) {
//       famDataMonth[element.date[5]] += element.total;
//     } else {
//       famDataMonth[element.date[5]] = element.total;
//     }
//   });

//   const chartRef = useRef(null);

//   useEffect(() => {
//     const chartDom = chartRef.current;
//     const myChart = echarts.init(chartDom);

//     const option = {
//       title: {
//         text: "Line Chart",
//         left: "center",
//         textStyle: {
//           color: "#ff0000", // Set the desired title color here
//         },
//       },
//       tooltip: {
//         trigger: "axis",
//       },
//       xAxis: {
//         type: "category",
//         data: Object.keys(jobDataMonth),
//       },
//       yAxis: {
//         type: "value",
//       },
//       series: [
//         {
//           name: "Line 1", // Optional: Set a name for the first line
//           type: "line",
//           data: Object.values(jobDataMonth), // Specify the data for the first line
//         },
//         {
//           name: "Line 2", // Optional: Set a name for the second line
//           type: "line",
//           data: Object.values(famDataMonth), // Specify the data for the second line
//         },
//       ],
//     };

//     myChart.setOption(option);

//     return () => {
//       myChart.dispose();
//     };
//   }, [jobData]);

//   return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
// };

// export default LineChartComponent;

//v3
import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import axios from "axios";
import "../css/selector.css";

const LineChartComponent = () => {
  // get the job data from ADO
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get("http://172.26.136.13:8000/api/v1/ado/job").then((res) => {
        setJobData(res.data.data);
      });
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const jobDataMonth = {};
  jobData.forEach((element) => {
    if (jobDataMonth[element.date]) {
      jobDataMonth[element.date] += element.total;
    } else {
      jobDataMonth[element.date] = element.total;
    }
  });

  //get the family data from ADO
  const [famData, setFamData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get("http://172.26.136.13:8000/api/v1/ado/family").then((res) => {
        setFamData(res.data.data);
      });
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const famDataMonth = {};
  famData.forEach((element) => {
    if (famDataMonth[element.date]) {
      famDataMonth[element.date] += element.total;
    } else {
      famDataMonth[element.date] = element.total;
    }
  });

  //select the job or family
  const [selectedDataType, setSelectedDataType] = useState("job");

  const handleDataTypeChange = (event) => {
    setSelectedDataType(event.target.value);
  };
  console.log(selectedDataType);
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: "Line Chart",
        left: "center",
        textStyle: {
          color: "#ff0000", // Set the desired title color here
        },
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data:
          selectedDataType === "job"
            ? Object.keys(jobDataMonth)
            : Object.keys(famDataMonth),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Line 1", // Optional: Set a name for the first line
          type: "line",
          data:
            selectedDataType === "job"
              ? Object.values(jobDataMonth)
              : Object.values(famDataMonth), // Specify the data for the first line
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [jobData, famData, selectedDataType]);

  return (
    <div>
      <div>
        <select
          value={selectedDataType}
          onChange={handleDataTypeChange}
          className="custom-select"
        >
          <option value="job">Job Data</option>
          <option value="family">Family Data</option>
        </select>
      </div>
      <div ref={chartRef} style={{ width: "100%", height: "250%" }} />
    </div>
  );
};

export default LineChartComponent;
