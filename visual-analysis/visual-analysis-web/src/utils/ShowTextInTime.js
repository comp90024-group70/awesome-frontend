import axios from "axios"
import { useState, useEffect } from "react"
import "../css/showTextInTime.css"
import { sendRequest } from "./requests"

function ShowTextInTime () {
  const [data, setData] = useState({})
  const [userName, setUserName] = useState("")
  const [text, setText] = useState("")
  // useEffect(() => {
  //   sendRequest("/mastodon/recent").then((res) => {
  //     setData(res.data.data);
  //   });
  // }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      sendRequest("/mastodon/recent").then((res) => {
        setData(res.data.data)
      })
    }, 5000)
    return () => {
      clearInterval(interval)
    }

  }, [])
  useEffect(() => {
    let newUser = data.username
    let newText = data.content
    console.log(newText)
    setUserName(newUser)
    setText(newText)
  }, [data])

  return (
    <>
      <h1
        style={{
          color: "black",
          textAlign: "center",
          marginTop: "5%",
          fontSize: "1px",
        }}
      >
        the newest mastodon content{" "}
      </h1>
      <div className="containerInTime">
        <div className="textInTime">
          {Object.keys(data).length === 0
            ? "Loading..."
            : `${userName}: ${text}`}
        </div>
      </div>
    </>
  )
}
export default ShowTextInTime
