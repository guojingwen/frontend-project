import React from 'react';
import ReactDOM from 'react-dom/client';

function App () {
  return <h3>Hello React</h3>
}

const ele = document.createElement('root');
document.body.appendChild(ele);
const root = ReactDOM.createRoot(ele);
root.render(<App/>);

