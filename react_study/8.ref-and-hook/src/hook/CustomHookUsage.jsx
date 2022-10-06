import React, { useState, useEffect } from "react";

export default function UseEffectUsage() {
  const date = useClock();
  return <div>{date}</div>;
}

function useClock() {
  const [date, setDate] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date().toLocaleTimeString());
    }, 1000);
    return () => {
      clearInterval(timer);
      console.log("定时器已被清除");
    };
  }, []);
  return date;
}
