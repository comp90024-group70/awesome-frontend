import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import axios from "axios";

export function StateBarChart() {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState([]);
  const [sentiment, setSentiment] = useState([]);

  //获取数据从url路径
  useEffect(() => {
    const interval = setInterval(() => {
      axios.get("http://172.26.136.13:8000/api/v1/sentiment").then((res) => {
        setData(res.data.data);
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
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
// import React, { useState, useEffect } from "react";
// import ReactECharts from "echarts-for-react";
// import axios from "axios";

// export function StateBarChart() {
//   const [data, setData] = useState([]);
//   const [date, setDate] = useState([]);
//   const [total, setTotal] = useState([]);

//   //获取数据从url路径
//   useEffect(() => {
//     const interval = setInterval(() => {
//       axios.get("http://172.26.136.13:8000/api/v1/").then((res) => {
//         setData(res.data.data);
//       });
//     }, 1000);
//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   //设置x轴和y轴的值 处理数据
//   useEffect(() => {
//     const newDate = [];
//     const newTotal = [];
//     data.map((item) => {
//       newDate.push(item.date);
//       newTotal.push(item.total);
//     });
//     //收到20万条数据
//     setDate(newDate);
//     setTotal(newTotal);
//   }, [data]);

//   console.log(date);
//   console.log(total);

//   //写入表格
//   const getOption = () => {
//     return {
//       tooltip: {
//         trigger: "axis",
//       },
//       grid: {
//         left: "3%",
//         right: "4%",
//         bottom: "3%",
//         containLabel: true,
//       },
//       xAxis: {
//         type: "category",
//         data: date,
//       },
//       yAxis: {
//         type: "value",
//       },
//       series: [
//         {
//           type: "bar",
//           data: total,
//         },
//       ],
//     };
//   };
//   return (
//     <ReactECharts
//       option={getOption()}
//       style={{ height: "100%", width: "100%" }}
//     />
//   );
// }
