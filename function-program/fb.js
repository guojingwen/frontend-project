const _add = curry(add);
// console.log(_add(1, 2));
const _add2 = _add(1);
console.log(_add2(3));

function add (x, y) {
  return x + y
}
function curry(fn) {
  const args = [];
  return function wrapper() {
    args.push(...arguments);
    if(args.length >= fn.length) return fn(...args);
    return wrapper;
  }
}
