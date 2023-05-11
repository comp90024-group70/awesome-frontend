// TimeDisplay.js
import React, { useState, useEffect } from 'react'

const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`
}

const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // 清除定时器
    return () => {
      clearInterval(timer)
    }
  }, [])

  return formatTime(currentTime)
}

export default TimeDisplay
