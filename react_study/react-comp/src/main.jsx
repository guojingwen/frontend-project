import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, NavLink, Routes, Route} from 'react-router-dom'
import PageReuse from './components/propsProxy/PropsProxyPageReuse'
import RenderHijack from './components/PropsProxy/PropsProxyRenderHijack'
import Permission from './components/propsProxy/PropsProxyPermission'

import Lazy from './components/lazy/index';
import ErrorBoundary from './components/ErrorBoundary'
import FuncRefush from './components/FuncRefush';

import PerformanceMonitoring from './components/reverseExtends/PerformanceMonitoring'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <h2>React组件化技术</h2>
    <BrowserRouter>
      <fieldset>
        <legend>属性代理</legend>
        <NavLink to='/PageReuse' className={getLinkClass}>页面复用</NavLink>
        <NavLink to='/RenderHijack' className={getLinkClass}>渲染劫持</NavLink>
        <NavLink to='/Permission' className={getLinkClass}>权限控制</NavLink>
      </fieldset>
      <NavLink to='/PerformanceMonitoring' className={getLinkClass}>反向继承 - 性能监控</NavLink>
      <NavLink to='/Lazy' className={getLinkClass}>Lazy组件</NavLink>
      <NavLink to='/ErrorBoundary' className={getLinkClass}>错误降级</NavLink>
      <NavLink to='/FuncRefush' className={getLinkClass}>function组件强刷</NavLink>
      <fieldset>
        <legend>React18新特性</legend>
        <span class="ml5">自动批处理</span>
        <span class="ml5">任务优先级</span>
        <span class="ml5">LazySSR</span>
        <span class="ml5">并发模式</span>
      </fieldset>
      <hr />
      <Routes>
        <Route path="/PageReuse" element={<PageReuse/>}></Route>
        <Route path='/RenderHijack' element={<RenderHijack>RenderHijack slot</RenderHijack>}></Route>
        <Route path='/Permission' element={<Permission>张三</Permission>}></Route>
        <Route path='/PerformanceMonitoring' element={<PerformanceMonitoring/>}></Route>
        <Route path='/Lazy' element={<Lazy/>}></Route>
        <Route path='/ErrorBoundary' element={<ErrorBoundary/>}></Route>
        <Route path='/FuncRefush' element={<FuncRefush/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
function getLinkClass({ isActive }) {
  return isActive ? "link active" : "link"
}
import './style.css';
