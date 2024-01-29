- MVVM

- defineReactive的缺点



- vue.set 
  - 不能给根节点加响应式
  - 浅层

- 重写了数组的7个方法
```js
const ap = Array.prototype
const arrMethods = Object.create(ap);
Object.definePrototype(arrMethods, 'push', {
  value(...args) {
    const result = ap.push.apply(this, args);
    return result;
  },
  writable: true,
  configurable: true,
  enmuerable: false,
});

function obArr(arr) {
  Object.setPrototype(arr, arrMethods);
  return arr;
}
obArr([]);
```


- vue源码
```js
new Vue({
  el: 'app',
  template: ``,
  data: {a:1},
  mounted(){
    setInterval(() => {
      ++this.a;
    }, 1000)
  }
})

class Vue {
  constructor(options){
    this.$options = options;
    // this.$el = opetions.el;
    this.$data = options.data
    observer(this.$data);
    proxy(this, '$data');
    new Compile(this, $el)
  }
}
function observer(obj) {
  if(!obj && typeof obj !== "object") {
    return;
  }
  new Observer(obj)
}
class Observer {
  constructor(value) {
    this.value = value;
    const valueType = Reflect.toString.call(value);
    if(valueType === '[object Object]') {
      this.walk(value);
    } else {
      // todo array
    }
  }
  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    })
  }
}
function defineReactive(obj, key, value) {
  if(typeof value === 'object'&& value !== null) {
    observer(value)
  } else {
    Object.definePrototype(obj, key, {
      get() {
        return vm[sourceKey][key];
      },
      set(val) {
        vm[sourceKey][key] = val;
      },
      enumerable:true,
      configurable: true,
    })
  }
}

new Vue
  - observer    -->  dep --> Watcher 
  - compile     --> vnode   --> Watcher 
```

- 观察者 Observer Subject
```js
class Subject {
  constructor(){
    this.observers = []
  }
  addObjserver(){}
  removeObserver(){}
  notifyAll(){
    this.observers.forEach(ob => {
      ob.update()
    })
  }
}
```

- 发布订阅模式
dep
