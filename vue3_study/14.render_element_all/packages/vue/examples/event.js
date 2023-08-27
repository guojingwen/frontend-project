const btn = document.getElementById('btn');
function handleClick() {
  console.log(123);
}
btn.addEventListener('click', handleClick);

// 假设事件发生变更，正常做法如下
function handleClick2() {
  console.log(123);
}
btn.removeEventListener('click', handleClick);
btn.addEventListener('click', handleClick2);

// 如果频繁切换事件会很消耗行动
// Vue3已经做了优化，思路如下
function invoker() {
  invoker.value();
}
invoker.value = handleClick;
btn.addEventListener('click', invoker);

// 当事件发生切换
invoker.value = handleClick2
// 是不是很精妙？
