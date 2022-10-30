import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, NavLink, Routes, Route} from 'react-router-dom'
import PropsProxy from './components/PropsProxy3'
import ReverseExtends from './components/ReverseExtends'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <h2>React组件化技术</h2>
    <BrowserRouter>
      <NavLink to='/PropsProxy' className={getLinkClass}>属性代理</NavLink>
      <NavLink to='/ReverseExtends' className={getLinkClass}>反向继承</NavLink>
      <hr />
      <Routes>
        <Route path="/PropsProxy" element={<PropsProxy />}></Route>
        <Route path='/ReverseExtends' element={<ReverseExtends/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
function getLinkClass({ isActive }) {
  return isActive ? "link active" : "link"
}
import './style.css';
