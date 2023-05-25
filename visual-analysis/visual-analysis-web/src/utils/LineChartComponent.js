import React, { useEffect, useState, useRef } from "react";
import ReactECharts from "echarts-for-react";
import "../css/selector.css";
import { sendRequest } from "./requests";

const LineChartComponent = () => {
  const chartRef = useRef(null);
  const [jobData, setJobData] = useState([]);
  const [famData, setFamData] = useState([]);
  const [selectedDataType, setSelectedDataType] = useState("job");

  useEffect(() => {
    sendRequest("/ado/job").then((res) => {
      setJobData(res.data.data);
    });
  }, []);

  useEffect(() => {
    sendRequest("/ado/family").then((res) => {
      setFamData(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.getEchartsInstance().resize();
    }
  }, [selectedDataType]);

  const jobDataDate = {};
  jobData.forEach((element) => {
    if (jobDataDate[element.date]) {
      jobDataDate[element.date] += element.total;
    } else {
      jobDataDate[element.date] = element.total;
    }
  });

  const famDataDate = {};
  famData.forEach((element) => {
    if (famDataDate[element.date]) {
      famDataDate[element.date] += element.total;
    } else {
      famDataDate[element.date] = element.total;
    }
  });

  const selectTheData = (event) => {
    setSelectedDataType(event.target.value);
  };

  const getOption = () => {
    return {
      title: {
        text: "ADO Posts Related to Job and Family",
        left: "center",
        textStyle: {
          color: "purple",
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
        axisLabel: {
          rotate: 40,
        },
      },
      series: [
        {
          name: "Line 1",
          type: "line",
          data:
            selectedDataType === "job"
              ? Object.values(jobDataDate)
              : Object.values(famDataDate),
          color: "#0099ff",
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
      <div style={{ width: "100%", height: "200px" }}>
        {jobData.length > 0 || famData.length > 0 ? (
          <ReactECharts
            ref={chartRef}
            option={getOption()}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <div>Loading chart...</div>
        )}
      </div>
    </div>
  );
};

export default LineChartComponent;
