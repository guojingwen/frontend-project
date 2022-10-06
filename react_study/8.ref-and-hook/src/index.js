import './style.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  NavLink,
  Routes,
  Route
} from 'react-router-dom';

import RefClassUsage from './refs/RefClassUsage';
import RefFuncUsage from './refs/RefFuncUsage';
import RefChildComp from './refs/RefChildComp';
import RefForward from './refs/RefForward';
import RefExpose from './refs/RefExpose';

import PureCompUsage from './hook/PureCompUsage'
import UseEffectUsage from './hook/UseEffectUsage'
import CustomHookUsage from './hook/CustomHookUsage';
import UseMemoUsage from './hook/UseMemoUsage';
import UseCallBackUsage from './hook/UseCallBackUsage';
import UseReducerUsage from './hook/UseReducerUsage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavLink to='/RefClassUsage' className={getLinkClass}>RefClassUsage</NavLink>
      <NavLink to='/RefFuncUsage' className={getLinkClass}>RefFuncUsage</NavLink>
      <NavLink to='/RefChildComp' className={getLinkClass}>RefChildComp</NavLink>
      <NavLink to='/RefForward' className={getLinkClass}>RefForward</NavLink>
      <NavLink to='/RefExpose' className={getLinkClass}>RefExpose</NavLink>
      <hr/>
      <NavLink to='/PureCompUsage' className={getLinkClass}>PureCompUsage</NavLink>
      <NavLink to='/UseEffectUsage' className={getLinkClass}>UseEffectUsage</NavLink>
      <NavLink to='/CustomHookUsage' className={getLinkClass}>CustomHookUsage</NavLink>
      <NavLink to='/UseMemoUsage' className={getLinkClass}>UseMemoUsage</NavLink>
      <NavLink to='/UseCallBackUsage' className={getLinkClass}>UseCallBackUsage</NavLink>
      <NavLink to='/UseReducerUsage' className={getLinkClass}>UseReducerUsage</NavLink>
      
      <Routes>
        <Route path="/RefClassUsage" element={<RefClassUsage />}></Route>
        <Route path="/RefFuncUsage" element={<RefFuncUsage />}></Route>
        <Route path="/RefChildComp" element={<RefChildComp />}></Route>
        <Route path="/RefForward" element={<RefForward />}></Route>
        <Route path="/RefExpose" element={<RefExpose />}></Route>
        
        <Route path="/PureCompUsage" element={<PureCompUsage />}></Route>
        <Route path="/UseEffectUsage" element={<UseEffectUsage />}></Route>
        <Route path="/CustomHookUsage" element={<CustomHookUsage />}></Route>
        <Route path="/UseMemoUsage" element={<UseMemoUsage />}></Route>
        <Route path="/UseCallBackUsage" element={<UseCallBackUsage />}></Route>
        <Route path="/UseReducerUsage" element={<UseReducerUsage />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
function getLinkClass({ isActive }) {
  return isActive ? "link active" : "link"
}
