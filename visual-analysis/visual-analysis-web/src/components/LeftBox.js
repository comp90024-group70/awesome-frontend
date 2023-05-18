import "../css/leftBox.css"
import { useContext, useEffect } from 'react'
import { PassedFlag } from '../utils/Map'
import { StateBarChart } from "../assets/StateBarChart"





function LeftBox (props) {
  const flag = useContext(PassedFlag)
  const { val } = props
  useEffect(() => {
    console.log(val)
  }, [val])



  return (
    <div className="leftBox">
      <div className="panelL">
        <h2>avg sentiment</h2>
        <div className="chartL">

          <StateBarChart />

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


