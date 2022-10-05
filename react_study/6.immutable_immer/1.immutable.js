// 如果是对象类型，在immutable中使用 Map
const { Map } = require('immutable');
const map1 = Map({ a: 1, b: 2, c: [1,2] });
// 修改原对象的属性会产生一个新对象， 原对象保持不变
const map2 = map1.set('b', 50); 

// 使用 .equals 方法比较
console.log(map1.equals(map2)); // false
// 取值 .get
console.log(map1.get('b'), map2.get('b')); // 2, 50
console.log(map1.get('c') === map2.get('c')); // true， c没有改变
console.log(map1.get('c') ===map2.get('c')); // true


const obj = map1.toJS();
var a = Object.isExtensible(obj)   // 是否可以新增属性
var b = Object.isSealed(obj)       // a + 是否可以修改已有属性的可配置型
var c = Object.isFrozen(obj)       // a + b + 是否可以修改已有属性的值
console.log(a, b, c) // true false false



const { Seq } = require('immutable');
const oddSquares = Seq([1, 2, 3, 4, 5, 6, 7, 8])
  .filter(x => {
      console.log('filter', x)
    return x % 2 !== 0
  })
  .map(x => x * x);
// 因为oddSquares是一个immutable对象，是惰性执行的，上述代码不会做任何操作

// 当把immutable对象转换成 JavaScript 对象是 才会执行
console.log(oddSquares.toJS()); // 控制台打印了 ‘filter’

const { Range } = require('immutable');
const aa = Range(990, 1010)
  .skip(18)
  .map(n => {
      console.log(n)
      return -n;
  })
  .reduce((r, n) => r * n, 1);

  console.log('---', aa)