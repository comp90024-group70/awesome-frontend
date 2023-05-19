import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const WordCloudComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const getRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    const option = {
      xAxis: {
        type: "category",
        show: false,
      },
      yAxis: {
        type: "category",
        show: false,
      },
      series: [
        {
          type: "scatter",
          symbolSize: function (value) {
            // Adjust the symbol size based on the value
            return value;
          },
          data: data.map((word) => {
            return {
              name: word.name,
              value: [Math.random() * 100, Math.random() * 100], // Random position for each word
            };
          }),
          label: {
            emphasis: {
              show: true,
              formatter: "{b}", // Display the name of the word on hover
            },
          },
          itemStyle: {
            color: getRandomColor(), // Generate a random color for each word
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

export default WordCloudComponent;
