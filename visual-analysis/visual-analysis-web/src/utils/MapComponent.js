import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { MapChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
} from "echarts/components";
import { SVGRenderer } from "echarts/renderers";

// Register necessary components
echarts.use([
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
  MapChart,
  SVGRenderer,
]);

const MapComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    // Generate fade data
    const generateFadeData = () => {
      const area = [
        { name: "Asia", value: getRandomValue() },
        { name: "Europe", value: getRandomValue() },
        { name: "Africa", value: getRandomValue() },
        { name: "North America", value: getRandomValue() },
        { name: "South America", value: getRandomValue() },
        { name: "Oceania", value: getRandomValue() },
      ];
      return area;
    };

    const getRandomValue = () => {
      const min = 0;
      const max = 100;
      const fadeThreshold = 50;
      const value = Math.floor(Math.random() * (max - min + 1)) + min;
      return value < fadeThreshold ? value : "-";
    };

    const data = generateFadeData();

    // Set the chart options
    const options = {
      title: {
        text: "Map Component",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      visualMap: {
        min: 0,
        max: 100,
        text: ["High", "Low"],
        left: "right",
        realtime: false,
        calculable: true,
      },
      series: [
        {
          type: "map",
          map: "world",
          roam: true,
          label: {
            show: true,
          },
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
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
};

export default MapComponent;
