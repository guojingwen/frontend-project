import React from "react";

export default function Forward() {
  const ref = React.createRef();
  return (
    <div>
      <MyInputW ref={ref} disabled placeholder="this is disabled input">
        MyInputW
      </MyInputW>
      <button onClick={() => console.log(ref.current)}>get MyInputW</button>
    </div>
  );
}

const MyInput = (props, ref) => (
  <input ref={ref} placeholder={props.placeholder} disabled={props.disabled}></input>
)
const MyInputW = React.forwardRef(MyInput);
