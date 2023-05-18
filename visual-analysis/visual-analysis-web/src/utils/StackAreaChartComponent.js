import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const StackAreaChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const option = {
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

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
};

export default StackAreaChartComponent;
