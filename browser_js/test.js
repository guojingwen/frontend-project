Function.prototype.myCall = function(center, ...args) {
  center.that = this;
  const result  = center(...args);
  delete center.that;
  return result
}

function myNew (Ctor, ...args) {
  let obj = Object.create(Ctor.prototype);
  const result = Ctor.call(result, ...args);
  if(result && ['object', 'function'].includes(typeof result)) {
    return result
  }
  return obj;
}

Function.prototype.myBind = function(context, ...args) {
  const that = this;
  return function (...newArgs) {
    return that.call(context, ...args, ...newArgs);
  }
}

Function.prototype.myBind2 = function (context, ...args) {
  const that = this
  const bound = function () {
    // return that.call(new.target ? this : context, ...args, ...arguments);
    return that.call(this instanceof bound ? this : context, ...args, ...arguments);
  }
  bound.prototype = this.prototype;
  return bound
}

function throttle(fn, ms) {
  let st = Date.now();
  let timer;
  return function (...args) {
    const now =  Date.now();
    if (now > (st + ms)) {
      clearTimeout(timer);
      st = now;
      fn(...args);
    } else {
      clearTimeout(timer)
      timer = setTimeout(() => {
        st = Date.now();
        clearTimeout(timer)
        fn(...args);
      }, st + ms - now);
    }

  }
}

function debounce(fn, ms) {
  let timer;
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...arguments);
      clearTimeout(timer)
    }, ms)
  }
}

Promise.myAll = function(arr) {
  const result = new Array(arr.length);
  let count = 0;
  return new Promise((resolve, reject) => {
    arr.forEach((p, index) => {
      p.then(res => {
        result[index] = res;
        ++count;
        if(count === result.length) {
          resolve(result)
        }
      }, reject)
    })
  });
}

function exec (fns, num) {
  for(let i = 0; i < 3; i++) {
    run();
  }
  function run () {
    const fn = fns.shift();
    fn().then(run);
  }
}
/**
 * 原型链 
 * f1, f2 = new O()         function Foo        Foo.prototype
 * 
 * 
 * o1,o2 = new Object()     function Object     Object.prototype
 * 
 * 
 *                          Function            Function.propotype
*/


// null   <---  Object.prototype
// Foo.prototype Function.prototype Object  Function.__proto__
// Object.__proto__ Function.__proto__ f1.__proto__
