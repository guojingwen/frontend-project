function mount (instance, el) {
  effect(() => {
    instance.$data && update(instance, el)
  });
  instance.$data = instance.setup();
  update(instance, el)
  function update(instance, el){
    el.innerHtml = instance.render();
  }
}

function reactive(obj) {
  if(!isObject(obj)) return;
  new Proxy(obj, {
    get(target, p, receiver) {
      const ret = Reflect.get(target, p ,receiver);
      track(ret);
      return isObject(ret) ? reactive(ret) : ret;
    },
    set(target, p, newVal, receiver) {
      Reflect.set(target, p, newVal, receiver);
      trigger(target, p)
      return true;
    }
  })
}

const targetMap = new WeakMap();
function track(target, p) {
  let depsMap  = targetMap.get(target);
  if(!depsMap) {
    targetMap.set(depsMap = new Map());
  }
  let depMap = depsMap.get(p);
  if(!depMap) {
    depsMap.set(depMap = new Set());
  }
  const effect = effectStacks.at(-1);
  if(effect) {
    depsMap.add(effect);
  }
}
function trigger(target, p) {
  const depsMap  = targetMap.get(target);
  if(!depsMap) return;
  const  depMap = depsMap.get(p);
  if(!depMap) return;
  depMap.forEach(effect => effect());
}

const effectStacks = []
function effect(fn) {
  const rxEffect = function() {
    try {
      effectStacks.push(rxEffect);
      fn()
    } finally {
      effectStacks.pop()
    }
  }
  rxEffect()
  return rxEffect;
}
