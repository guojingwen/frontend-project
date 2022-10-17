export function mount(instance, el) {
  effect(() => {
    instance.$data && update(el, instance);
  })
  instance.$data = instance.setup();
  update(el, instance);
  function update(el, instance) {
    el.innerHTML = instance.render();
  }
}

export function reactive(obj) {
  if(!isObject(obj)) return;

  return new Proxy(obj, {
    get(target, p, receiver) {
      const ret  = Reflect.get(target, p, receiver);
      track(target, p);
      return isObject(ret) ? reactive(ret) : ret;
    },
    set(target, p, newVal, receiver) {
      Reflect.set(target, p, newVal, receiver);
      trigger(target, p);
      return true;
    }
  })
}
const targetMap = new WeakMap();
function track(target, p) {
  let depsMap = targetMap.get(target);
  if(!depsMap) {
    targetMap.set(target, depsMap = new Map());
  }

  let dep = depsMap.get(p);
  if(!dep) {
    depsMap.set(p, dep = new Set());
  }
  const effect = effectStack.at(-1);
  if(effect) {
    if(!dep.has(effect)) {
      dep.add(effect)
    }
  }
}
function trigger(target, p) {
  const depsMap = targetMap.get(target);
  if(!depsMap) return;
  const dep = depsMap.get(p);
  dep?.forEach(effect => effect())
}

// 保存当前活动响应函数作为getter和effect之间桥梁
const effectStack = [];
function effect(fn) {
  const rxEffect = function () {
    // 1. 捕捉可能的异常
    try {
      // 依赖收集和触发
      // 2. 入栈，用于后续依赖收集
      effectStack.push(rxEffect);
      return fn();
    } finally {
      // 4. 执行结束，出栈
      // 为什么可以出栈，因为上一步执行fn()的时候
      // 触发了get() ==> 调用了track  完成依赖收集
      effectStack.push();
    }
  }
  rxEffect();
  // 返回响应式函数
  return rxEffect;
}

const isObject = data => data && typeof data === 'object';
