export function reactive (data) {
    if(!isObject(data)) return;

    return new Proxy(data, {
        get(target, p, receiver) {
            const ret = Reflect.get(target, p, receiver);
            track(target, p);
            return isObject(ret) ? reactive(ret): ret; 
        },
        set(target, p, newValue, receiver) {
            Reflect.set(target, p, newValue, receiver);
            trigger(target, p);
            return true;
        },
        deleteProperty(target, p){
            const ret = Reflect.deleteProperty(target, p);
            trigger(trigger, p);
            return ret;
        }
    });
}
/**
 * targetMap:
 *      target: Map
 *              p: Set()
 *                 [ReactiveEffect, ...]
 */
const targetMap = new WeakMap();
function track(target, p) {
    let depsMap = targetMap.get(target);
    if(!depsMap) targetMap.set(target, depsMap = new Map());
    let dep = depsMap.get(p);
    if(!dep) depsMap.set(p, dep = new Set());

    trackEffect(dep);
}

function trigger (target, p) {
    const depsMap = targetMap.get(target);
    if(!depsMap) return;
    
    const dep = depsMap.get(p);
    dep?.forEach(effect => {
        effect?.run()
    });
}
let activeEffect;
function trackEffect (dep) {
    if(activeEffect) {
        dep.add(activeEffect);
    }
}


function effect (fn, options = {}) {
    const __effect = new ReactiveEffect(fn);
    if(!options.lazy) {
        __effect.run();
    }
    return effect;
}

class ReactiveEffect {
    constructor(fn) {
        this.fn = fn;
        activeEffect = this;
    }
    run() {
        this.fn();
    }
}

export function mount(instance, el) {
    effect(() => {
        instance.$data && update(el, instance);
    })
    instance.$data = instance.setup();
    update(el, instance);
    function update(el, instance) {
        el.innerHTML = instance.render()
    }
}

function isObject(data) {
    return data && typeof data === 'object';
}