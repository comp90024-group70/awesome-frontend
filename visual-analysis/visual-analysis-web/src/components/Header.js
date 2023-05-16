import "../css/header.css"
import TimeDisplay from "../utils/setTime"


function headerLine () {
  let time = TimeDisplay()
  return (



    <div className="headerLine">
      <h1 >
        Welcome
      </h1>
      <p>{time}</p>
    </div>
  )
};

export default headerLine