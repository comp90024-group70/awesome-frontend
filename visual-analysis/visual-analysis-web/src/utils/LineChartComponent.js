import React, { useEffect, useState } from "react";
// import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";
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

  const jobDataDate = {};
  jobData.forEach((element) => {
    if (jobDataDate[element.date]) {
      jobDataDate[element.date] += element.total;
    } else {
      jobDataDate[element.date] = element.total;
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

  const famDataDate = {};
  famData.forEach((element) => {
    if (famDataDate[element.date]) {
      famDataDate[element.date] += element.total;
    } else {
      famDataDate[element.date] = element.total;
    }
  });

  //select the job or family
  const [selectedDataType, setSelectedDataType] = useState("job");

  const selectTheData = (event) => {
    setSelectedDataType(event.target.value);
  };

  // const chartRef = useRef(null);

  // useEffect(() => {
  //   const chartDom = chartRef.current;
  //   const myChart = echarts.init(chartDom);

  const getOption = () => {
    return {
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
            ? Object.keys(jobDataDate)
            : Object.keys(famDataDate),
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
              ? Object.values(jobDataDate)
              : Object.values(famDataDate), // Specify the data for the first line
        },
      ],
    };
  };
  return (
    <div>
      <div>
        <select
          value={selectedDataType}
          onChange={selectTheData}
          className="custom-select"
        >
          <option value="job">Job Data</option>
          <option value="family">Family Data</option>
        </select>
      </div>
      {/* <div ref={chartRef} style={{ width: "100%", height: "250%" }} /> */}
      <ReactECharts
        option={getOption()}
        style={{ width: "100%", height: "220%" }}
      />
    </div>
  );
};
export default LineChartComponent;
