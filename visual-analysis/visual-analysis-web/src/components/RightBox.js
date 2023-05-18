import "../css/rightBox.css"
import { useContext, useEffect } from 'react'
import { PassedFlag } from '../components/MainBox'


function RightBox () {
  const { flag } = useContext(PassedFlag)
  // const { val } = props
  useEffect(() => {
    console.log(flag)
  }, [flag])



  return (
    <div className="rightBox">
      <div className="panelR">
        <h2>某图关于drugs</h2>
        <div className="chartR">图表</div>
        <div className="panelfooterR"> </div>
      </div>
      <div className="panelR">
        <h2>某图关于drugs</h2>
        <div className="lineR">图表</div>
        <div className="panelfooterR"> </div>
      </div>
      <div className="panelR">
        <h2>某图关于drugs</h2>
        <div className="pieR">图表</div>
        <div className="panelfooterR"> </div>
      </div>
    </div>
  )
};

export default RightBox