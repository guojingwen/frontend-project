import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppTimer from './AppTimer'
import AppTimer2 from './AppTimer2'
import AppTimer3 from './AppTimer3'
import AppTimer4 from './AppTimer4'
import AppTimer5 from './AppTimer5'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <hr />
    <AppTimer />
    <hr />
    <AppTimer2 />
    <hr />
    <AppTimer3 />
    <hr />
    <AppTimer4 />
    <hr />
    <AppTimer5 />
  </React.StrictMode>
);
