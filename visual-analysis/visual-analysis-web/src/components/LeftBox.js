import "../css/leftBox.css";
import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import axios from "axios";

function LeftBox() {
  const getOption = () => {
    return {
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {},
      series: [
        {
          name: "Sales",
          type: "bar",
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    };
  };
  const [data, setData] = useState(null);
  useEffect(() => {
    const interval = setInterval(() => {
      axios.get("http://172.26.136.13:8000/api/v1/mas_count").then((res) => {
        // data = res.data
        // console.log(res.data)
        setData(res.data.null);
      });
    }, 1000);
    return () => {
      clearInterval(interval); // 组件卸载时清除间隔
    };
  }, []);

  return (
    <div className="leftBox">
      <div className="panelL">
        <h2>{data}</h2>
        <div className="chartL">
          <ReactECharts
            option={getOption()}
            style={{ height: "100%", width: "100%" }}
          />
        </div>
        <div className="panelfooterL"></div>
      </div>
      <div className="panelL">
        <h2>某图关于drugs</h2>
        <div className="lineL">图表</div>
        <div className="panelfooterL"> </div>
      </div>
      <div className="panelL">
        <h2>某图关于drugs</h2>
        <div className="pieL">图表</div>
        <div className="panelfooterL"> </div>
      </div>
    </div>
  );
}

export default LeftBox;
