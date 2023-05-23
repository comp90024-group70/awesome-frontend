import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { sendRequest } from "./requests";
export function StateBarChart() {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState([]);
  const [sentiment, setSentiment] = useState([]);

  useEffect(() => {
    sendRequest("/twitter/sentiment").then((res) => {
      setData(res.data.data);
    });
  }, []);

  //设置x轴和y轴的值 处理数据
  useEffect(() => {
    const newCountries = [];
    const newSentiments = [];
    data.map((item) => {
      newCountries.push(item.gcc);
      newSentiments.push(item.sentiment_avg);
    });
    //收到20万条数据
    setCountry(newCountries);
    setSentiment(newSentiments);
  }, [data]);

  //写入表格
  const getOption = () => {
    return {
      tooltip: {
        trigger: "axis",
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      title: {
        text: "Overall Sentiment Analysis",
        left: "center",
        textStyle: {
          color: "purple",
        },
      },
      xAxis: {
        type: "category",
        data: country,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          type: "bar",
          data: sentiment,
          itemStyle: {
            // color: "#F0CAA3",
            color: "#0099ff",
          },
        },
      ],
    };
  };
  return (
    <ReactECharts
      option={getOption()}
      style={{ height: "100%", width: "100%" }}
    />
  );
}
