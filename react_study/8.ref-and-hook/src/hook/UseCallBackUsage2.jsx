import React, { useState, PureComponent, useCallback } from "react";

export default function UseCallbackPage(props) {
  const [count, setCount] = useState(0);

/*  const addClick = () => { // 输入框 value改变 却触发Child组件的渲染
    let sum = 0;
    for (let i = 0; i < count; i++) {
      sum += i;
    }
    return sum;
  }*/

  const addClick = useCallback(() => {
    let sum = 0;
    for (let i = 0; i < count; i++) {
      sum += i;
    }
    return sum;
  }, [count]);
  const [value, setValue] = useState("");

  return (
    <div>
      <h3>UseCallbackPage</h3>
      <p>value: {value}</p>
      <input value={value} onChange={event => setValue(event.target.value)} />
      {/* 输入框 value改变 不应当触发Child组件的渲染 */}
      <hr/>
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>add</button>
      <Child addClick={addClick} />
    </div>
  );
}

class Child extends PureComponent { // useCallback 必须配合子组件 PureComponent才能使用
  render() {
    console.log("child render");
    const { addClick } = this.props;
    return (
      <div>
        <h3>Child</h3>
        <button onClick={() => console.log(addClick())}>add</button>
      </div>
    );
  }
}
