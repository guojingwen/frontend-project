# startTransition
- 标记渲染的优先级，提高用户交互
- 举例来说：input的value更新，请求了接口有3W个item更新。然而这种多数据让页面无法及时响应，也让用户输入感觉很慢。
- V18前 update的优先级一样
- V18 支持优先级手动设置

```js
// 紧急的更新：展示用户的输入
startTransition(() => {
  setInputValue(e.target.value)
});
// 非紧急的更新： 展示结果
setContent(e.target.value);
``` 
- 与 setTimeout 的区别
- 1. setTimeout是延时执行，startTransition是立即执行的，传给startTransition的函数是同步运行，但是其内部的所有更新都会标记为非紧急，React将在稍后处理更新时决定如何render这些updates,这意味着将会比setTimeout中的更新更早的被render
- 2. 另一个重要区别是startTransition中的更新是可中断的

