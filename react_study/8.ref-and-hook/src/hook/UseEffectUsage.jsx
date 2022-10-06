import React, { useState, useEffect } from "react";

export default function UseEffectUsage() {
  const [date, setDate] = useState(new Date().toLocaleTimeString());

  useEffect(
    () => {
      // 相当于componentDidMount + componentDidUpdate(有依赖项的情况)
      const timer = setInterval(() => {
        setDate(new Date().toLocaleTimeString());
      }, 1000);
      // return 相当于 componentWillUnmount
      return () => {
        clearInterval(timer);
        console.log('定时器已被清除')
      };
    },
    // 依赖项，哪些state发生改变触发更新
    // 相当于 shouldComponentUpdate
    []
  );

  return <div>{date}</div>;
}
