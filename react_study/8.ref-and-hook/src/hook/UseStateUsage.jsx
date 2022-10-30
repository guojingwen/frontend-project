import React, { useState, useEffect } from 'react';

// export default function UseStateUsage () {
//   const [arr, setArr] = useState([0]);

//   useEffect(() => {
//     console.log(arr);
//   }, [arr]);

//   const handleClick = () => {
//     Promise.resolve().then(() => {
//       setArr([...arr, 1]);
//     }).then(() => {
//       setArr([...arr, 2]); // 时赋值前 arr 为旧状态仍然为：[0]
//     })
//   }
//   return <div>
//     <button onClick={handleClick}>click</button>
//   </div>
// }

//  解决方案1  setState(function)
// export default function UseStateUsage () {
//   const [arr, setArr] = useState([0]);

//   useEffect(() => {
//     console.log(arr);
//   }, [arr]);

//   const handleClick = () => {
//     Promise.resolve().then(() => {
//       setArr((arr) => [...arr, 1]);
//     }).then(() => {
//       setArr((arr) => [...arr, 2]);
//     })
//   }
//   return <div>
//     <button onClick={handleClick}>click</button>
//   </div>
// }

// 解决方案2  使用UseReducer模拟强制刷新
// export default function UseStateUsage() {
//   const [,forceUpdate] = React.useReducer(x => x+1, 0);

//   const [arr] = useState([0]);
//   const handleClick = () => {
//     Promise.resolve().then(() => {
//       arr.push(1);
//     }).then(() => {
//       arr.push(2);
//       forceUpdate();
//     })
//   }
//   return <div>
//     <h1>{arr.toString()}</h1>
//     <button onClick={handleClick}>click</button>
//   </div>
// }


// 解决方案3 ref
export default function UseStateUsage() {

  const [arr, setArr, getArr] = useGetState([0]);
  const handleClick = () => {
    Promise.resolve().then(() => {
      setArr([...getArr(), 1]);
    }).then(() => {
      setArr([...getArr(), 2]);
    })
  }
  return <div>
    <h1>{arr.toString()}</h1>
    <button onClick={handleClick}>click</button>
  </div>
}

const useGetState = (initVal) => {
  const [state, setState] = useState(initVal);
  const ref = React.useRef(initVal);
  const _setState = (newVal) => {
    ref.current = newVal;
    setState(newVal)
  }
  const getState = () => {
    return ref.current;
  }
  return [state, _setState, getState];
}

// 参考资料 https://www.cnblogs.com/hymenhan/p/14991789.html
