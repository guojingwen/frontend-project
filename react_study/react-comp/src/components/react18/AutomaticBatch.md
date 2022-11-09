## Automatic batching
- 将多个状态更新合并成一个重新渲染以取得更好的性能的一种优化方式
- V18前 默认不batching的scene （setState在哪些场景下是同步的）
    - promise
    - setTimeout
    - 原生事件处理

```js
function Comp() {
  function handleClick() {
    setCount(c => c + 1); // Does not re-render yet
    setFlag(f => !f); // Does not re-render yet
    // React will only re-render once at the end (that's batching!)
  }
  function handleClick2() {
    fetchSomething().then(() => {
      //  react< 18 会渲染两次
      setCount(c => c + 1);
      setFlag(f => !f);
    });
  }
  // 若不想batching ？
  function handleClick3() {
    fetchSomething().then(() => {
      flushSync(() => {
        setCounter(c => c + 1);
      });
      // React has updated the DOM by now
      flushSync(() => {
        setFlag(f => !f);
      });
      // React has updated the DOM by now
    });
  }
  return <>
   <button onClick={handleClick}>Next</button>
  </>
}
import {flushSync} from 'react-dom'
```

## batching 对hooks 及 class的影响
```js
handleClick = () => {
  setTimeout(() => {
    this.setState(({ count }) => ({ count: count + 1 }));
 		// V18前 { count: 1, flag: false }
    // V18中 { count: 0, flag: false }，除非使用flushSync
    console.log(this.state);

    this.setState(({ flag }) => ({ flag: !flag }));
  });
};
```
- 在一些react库中，如react-dom， unstable_batchedUpdates 实现类似功能
```js
import { unstable_batchedUpdates } from 'react-dom';
unstable_batchedUpdates(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
});
```
