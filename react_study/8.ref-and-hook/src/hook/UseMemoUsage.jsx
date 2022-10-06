import {useState, useMemo} from 'react';

export default function UseMemoUsage() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  /* const expensive = () => {
    console.log("compute"); // 输入框 value 改变 也会触发
    let sum = 0;
    for (let i = 0; i < count; i++) {
      sum += i;
    }
    return sum;
  }; */
  const expensive = useMemo(() => {
    console.log("compute");
    let sum = 0;
    for (let i = 0; i < count; i++) {
      sum += i;
    }
    return sum;
  }, [count]); // 只有count改变才进行expensive计算;
  return (
    <div>
      <p>{count} -- {expensive} </p>
      <button onClick={() => setCount(count + 1)}>ADD</button>
      <input type="text" value={text} placeholder='试试输入内容' onInput={e => {
        setText(e.target.value)
      }}/>
    </div>
  );
}
