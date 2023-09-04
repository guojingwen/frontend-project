import React, { useCallback, useState } from 'react';

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
const NewChild = React.memo(Child);
export default function UseCallBackUsage() {
  const [value, setValue] = useState({ text: "" });
  const getValue = useCallback(() => {
    console.log(value.text);
  }, []);
  console.log("父组件渲染");
  const onChange = (e) => {
    setValue({
      text: e.target.value,
    });
  };
  return (
    <div>
      <p>{value.text}</p>
      <input
        type="text"
        placeholder="输入内容试试看"
        value={value.text}
        onChange={onChange}
      />
      <hr />
      <NewChild getValue={getValue} />
    </div>
  );
}
function Child(props) {
  // 父组件setState会触发子组件渲染
  console.log("子组件渲染");
  return (
    <div>
      <span>子组件</span>
      <button onClick={props.getValue}>getValue()</button>
    </div>
  );
}
