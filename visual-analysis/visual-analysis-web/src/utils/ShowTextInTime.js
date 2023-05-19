import axios from "axios"
import { useState, useEffect } from "react"
import "../css/showTextInTime.css"

function ShowTextInTime () {
  const textShow = "hello world"
  const [data, setData] = useState([])
  const [text, setText] = useState([])
  useEffect(() => {
    const interval = setInterval(() => {
      axios.get("url").then((res) => {
        setData(res.data.string)
      })
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])
  useEffect(() => {
    const newText = []
    data.map((item) => {
      newText.push(item.text)
    })
    setText(newText)
  }, [data])

  return (
    <div className="containerInTime">
      <div className="textInTime">
        Hello, world!
      </div>
    </div>
  )
}
export default ShowTextInTime