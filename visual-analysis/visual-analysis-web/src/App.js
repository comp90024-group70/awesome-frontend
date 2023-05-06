
import Home from "./Home"
import { useEffect, useState } from 'react'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import axios from 'axios'
function App () {
  const [data, setData] = useState(null)
  useEffect(() => {
    //发送网络请求
    async function loadData () {
      //     const res = await fetch('url')// axios
      axios.get('http://172.26.131.199:8000/api/v1/database_status').then(res => {
        // data = res.data
        // console.log(res.data)
        setData(res.data.status)
      })
    }
    loadData()
  }, [])
  return (
    <BrowserRouter>
      {/*点击跳转位置*/}
      <Link to='/'>Main</Link>
      <Link to='/home'>Home</Link>
      {/*路由出口位置*/}
      <Routes>
        <Route path='/home' element={<Home />}></Route>

      </Routes>

      <div>
        {data}
      </div>
    </BrowserRouter>
  )
}

export default App
