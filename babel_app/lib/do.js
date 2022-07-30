var t;

function f() {
  console.log('f');
  return 2;
}

var x = (console.log('do x 运行了'), t = f(), t * t + 1);
console.log('x', x);