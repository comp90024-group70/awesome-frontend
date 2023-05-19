import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import axios from "axios";

const StackAreaChartComponent = ({ data }) => {
  const getOption = () => {
    return {
      title: {
        text: "Stack Area Chart",
        left: "center",
        textStyle: {
          color: "#ff0000", // Set the desired title color here
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
      },
      legend: {
        data: data.legendData,
        bottom: "bottom",
        textStyle: {
          color: "purple",
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: data.xAxisData,
      },
      yAxis: {
        type: "value",
      },
      series: data.seriesData.map((series) => ({
        type: "line",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: series.data,
        name: series.name,
      })),
    };
  };
  return (
    <ReactECharts
      option={getOption()}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default StackAreaChartComponent;
