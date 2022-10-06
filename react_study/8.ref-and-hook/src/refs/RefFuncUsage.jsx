import {useRef} from 'react';

export default function FuncRef () {
  const inputRef = useRef();
  return <div>
    <input type="text" ref={inputRef}/>
    <button onClick={handleClick}>focus</button>
  </div>
  function handleClick() {
    inputRef.current.focus();
  }
}
