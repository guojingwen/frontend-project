import React from 'react';
/**
 * class 组件可以使用 this.$forceUpdate强制刷新
 * 那么function组件如何实现强制刷新呢？
 */
export default function () {
  let time = new Date().toLocaleTimeString();
  setInterval(() => {
    time = new Date().toLocaleTimeString();
  }, 1000);

  // const [, forceUpdate] = React.useState('');  
  // forceUpdate(Date.now())
  const [, forceUpdate] = React.useReducer(x => x+1, 0);
  return <>
    <p>{time}</p>
    <button onClick={() => forceUpdate()}>刷新</button>
  </>
}
