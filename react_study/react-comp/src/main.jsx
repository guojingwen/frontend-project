import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, NavLink, Routes, Route} from 'react-router-dom'
import PageReuse from './components/propsProxy/PropsProxyPageReuse'
import RenderHijack from './components/PropsProxy/PropsProxyRenderHijack'
import Permission from './components/propsProxy/PropsProxyPermission'

import Lazy from './components/lazy/index';
import ErrorBoundary from './components/ErrorBoundary'
import FuncRefush from './components/FuncRefush';
import ExposureDisappear from './components/ExposureDisappear';


import PerformanceMonitoring from './components/reverseExtends/PerformanceMonitoring';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <h2>React组件化技术之高阶函数</h2>
    <BrowserRouter>
      <fieldset>
        <legend>属性代理</legend>
        <NavLink to='/PageReuse' className={getLinkClass}>页面复用</NavLink>
        <NavLink to='/RenderHijack' className={getLinkClass}>渲染劫持</NavLink>
        <NavLink to='/Permission' className={getLinkClass}>权限控制</NavLink>
      </fieldset>
      <fieldset>
        <legend>反向继承</legend>
        <NavLink to='/PerformanceMonitoring' className={getLinkClass}>性能监控</NavLink>
      </fieldset>
      <fieldset>
        <legend>其他</legend>
        <NavLink to='/Lazy' className={getLinkClass}>Lazy组件</NavLink>
        <NavLink to='/ErrorBoundary' className={getLinkClass}>错误降级</NavLink>
        <NavLink to='/FuncRefush' className={getLinkClass}>function组件强刷</NavLink>
        <NavLink to="/ExposureDisappear" className={getLinkClass}>埋点上报</NavLink>
      </fieldset>
      <fieldset>
        <legend>React18新特性</legend>
        <span className="ml5">自动批处理</span>
        <span className="ml5">任务优先级</span>
        <span className="ml5">LazySSR</span>
        <span className="ml5">并发模式</span>
      </fieldset>
      <hr />
      <Routes>
        <Route path="/PageReuse" element={<PageReuse/>}></Route>
        <Route path='/RenderHijack' element={<RenderHijack>This is box</RenderHijack>}></Route>
        <Route path='/Permission' element={<Permission>张三</Permission>}></Route>
        <Route path='/PerformanceMonitoring' element={<PerformanceMonitoring count={30}/>}></Route>
        <Route path='/Lazy' element={<Lazy/>}></Route>
        <Route path='/ErrorBoundary' element={<ErrorBoundary/>}></Route>
        <Route path='/FuncRefush' element={<FuncRefush/>}></Route>
        <Route path='/ExposureDisappear' element={<ExposureDisappear/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
function getLinkClass({ isActive }) {
  return isActive ? "link active" : "link"
}
import './style.css';
