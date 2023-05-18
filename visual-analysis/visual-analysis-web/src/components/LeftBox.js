import "../css/leftBox.css"
import { useContext, useEffect } from 'react'
import { PassedFlag } from '../components/MainBox'
import { StateBarChart } from '../utils/StateBarChart'





function LeftBox () {
  const { flag } = useContext(PassedFlag)
  // const { val } = props
  useEffect(() => {
    console.log(flag)
  }, [flag])

  let ExactBarChartL
  // let ExactLineChartL
  // let ExactPieChartL
  if (flag.Melbourne === false && flag.Sydney === false) {
    ExactBarChartL = StateBarChart


  } else if (flag.Melbourne === true && flag.Sydney === false) {
    // ExactBarChartL = MelbourneChart
  } else if (flag.Melbourne === false && flag.Sydney === true) {
    // ExactBarChartL = SydneyChart
  }



  return (
    <div className="leftBox">
      <div className="panelL">
        <h2>avg sentiment</h2>
        <div className="chartL">
          <ExactBarChartL />

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


