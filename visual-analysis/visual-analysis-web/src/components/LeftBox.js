import "../css/leftBox.css"
import React, { useState, useEffect } from 'react'
import ReactECharts from 'echarts-for-react'
import axios from 'axios'




function LeftBox () {

  const [data, setData] = useState([])
  const [country, setCountry] = useState([])
  const [sentiment, setSentiment] = useState([])
  // const [uniqueCountry, setUniqueCountry] = useState(new Set())
  // const [dic, setDic] = useState({})
  // const newSet = new Set(uniqueCountry)

  // const newSentiments = []
  // const newCountries2 = []
  //// 初始化
  // const initialDictionary = {}
  // uniqueCountry.forEach((key) => {
  //   initialDictionary[key] = 0
  // })

  //获取数据从url路径
  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('http://172.26.136.13:8000/api/v1/sentiment').then(res => {

        setData(res.data.data)
      })
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  //设置x轴和y轴的值 处理数据
  useEffect(() => {
    const newCountries = []
    const newSentiments = []
    data.map((item) => {
      newCountries.push(item.gcc)
      newSentiments.push(item.sentiment_avg)
    })
    //收到20万条数据
    setCountry(newCountries)
    setSentiment(newSentiments)
  }, [data])

  // //设置x轴和y轴的值 处理数据
  // useEffect(() => {
  //   const newCountries = []

  //   data.map((item) => {
  //     newCountries.push(item.gcc)
  //   })
  //   //收到20万条数据
  //   setCountry(newCountries)

  //   //处理数据
  // }, [])

  // useEffect(() => {
  //   //获取国家的唯一值
  //   newSet.add(country)
  //   setUniqueCountry(newSet)

  //   data.map((item) => {
  //     Object.entries(item).forEach(([key, value]) => {
  //       let falg = ''
  //       uniqueCountry.forEach((key2) => {
  //         if (key === "gcc" && value === key2) {
  //           falg = key2
  //         }
  //         if (key == "sentiment") {
  //           initialDictionary[falg] += value
  //         }
  //       })
  //     })
  //   })

  //   setDic(initialDictionary)


  //   Object.entries(dic).forEach(([key, value]) => {

  //     newCountries2.push(key)
  //     newSentiments.push(value / 200000)//计算 20万条数据的平均值
  //   })

  //   //制作x轴和y轴的值
  //   setCountry(newCountries2)
  //   setSentiment(newSentiments)
  // }, [])




  //写入表格
  const getOption = () => {
    return {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: country
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'bar',
          data: sentiment
        }
      ]

    }
  }

  return (
    <div className="leftBox">
      <div className="panelL">
        <h2>avg sentiment</h2>
        <div className="chartL">

          < ReactECharts option={getOption()} style={{ height: "100%", width: "100%" }} />


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
  )
};

export default LeftBox


