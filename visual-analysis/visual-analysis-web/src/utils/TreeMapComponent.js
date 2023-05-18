import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const TreeMapComponent = ({ data }) => {
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
