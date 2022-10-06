import React, { useCallback, useState } from 'react';

const NewChild = React.memo(Child);
export default function UseCallBackUsage() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState('');

  // 输入框改变，子组件会重新渲染
  // const getSum = () => {
  //   let sum = 0;
  //   for(let i=0; i<=count; i++) {
  //     sum += count;
  //   }
  //   return sum;
  // }

  // 输入框改变， 子组件不再被渲染
  const getSum = useCallback(() => {
    let sum = 0;
    for(let i=0; i<=count; i++) {
      sum += count;
    }
    return sum;
  }, []);
  
  console.log('父组件渲染')
  return (
    <div>
      <p>{value}</p>
      <input type="text" placeholder='输入内容试试看' value={value}
      onChange={e => setValue(e.target.value)}/>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>ADD</button>
      <NewChild getSum={getSum}></NewChild>
    </div>
  )
}

function Child(props) {
  console.log('子组件渲染')
  return <div style={{border: '1px solid #ddd', marginTop: '10px'}}>
    <span>{props.title}</span>
    <button onClick={() => console.log(props.getSum())}>getSum()</button>
  </div>
}
