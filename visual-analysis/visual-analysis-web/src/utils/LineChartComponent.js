import React, { useEffect, useState } from "react"
import ReactECharts from "echarts-for-react"
import "../css/selector.css"
import { sendRequest } from "./requests"

const LineChartComponent = () => {
  const [jobData, setJobData] = useState([])
  useEffect(() => {
    sendRequest("/ado/job").then((res) => {
      setJobData(res.data.data)
    })
  }, [])

  const jobDataDate = {}
  jobData.forEach((element) => {
    if (jobDataDate[element.date]) {
      jobDataDate[element.date] += element.total
    } else {
      jobDataDate[element.date] = element.total
    }
  })

  const [famData, setFamData] = useState([])

  useEffect(() => {
    sendRequest("/ado/family").then((res) => {
      setFamData(res.data.data)
    })
  }, [])

  const famDataDate = {}
  famData.forEach((element) => {
    if (famDataDate[element.date]) {
      famDataDate[element.date] += element.total
    } else {
      famDataDate[element.date] = element.total
    }
  })

  //select the job or family
  const [selectedDataType, setSelectedDataType] = useState("job")

  const selectTheData = (event) => {
    setSelectedDataType(event.target.value)
  }

  const getOption = () => {
    return {
      title: {
        text: "ADO Posts Related to Job and Family ",
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
          name: "Line 1", // Optional: Set a name for the first line
          type: "line",
          data:
            selectedDataType === "job"
              ? Object.values(jobDataDate)
              : Object.values(famDataDate),
          color: "#0099ff",
        },
      ],
    }
  }
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
      <ReactECharts
        option={getOption()}
        style={{ width: "100%", height: "220%" }}
      />
    </div>
  )
}
export default LineChartComponent
