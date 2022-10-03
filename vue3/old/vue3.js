function reactive(data) {
    if(!isObject(data)) return;
    return new Proxy(data, {
        get(target, key, receiver) {
            const ret = Reflect.get(target, key, receiver);
            track(target, key);
            return isObject(ret) ? reactive(ret): ret;
        },
        set(target, key, value, receiver) {
            Reflect.set(target, key, value, receiver);
            trigger(target, key);
            return true;
        },
        deleteProperty(target, key) {
            const ret = Reflect.deleteProperty(target, key);
            trigger(target, key);
            return ret;
        }
    })
}

/**
 * targetMap
 *      target: { // Map
 *          key: // Set
 *              [ReactiveEffect, ....]
 *      }
 */
const targetMap = new WeakMap();
function track(target, key) {
    let depsMap =  targetMap.get(target);
    if(!depsMap) targetMap.set(target, depsMap = new Map());
    let dep = depsMap.get(key);
    if(!dep) depsMap.set(key, dep = new Set());

    trackEffect(dep);
}
function trigger(target, key){
    const depsMap = targetMap.get(target);
    if(!depsMap) return;

    depsMap.get(key).forEach(effect => effect?.run());
}
let activeEffect;
function trackEffect(dep) {
    if(!dep.has(activeEffect)) {
        dep.add(activeEffect);
    }
}
class ReactiveEffect {
    constructor(fn){
        this.fn = fn;
    }
    run() {
        activeEffect = this;
        return this.fn();
    }
}

function effect(fn, options = {}){
    let __effect = new ReactiveEffect(fn);
    if(!options.lazy) {
        __effect.run()
    }
    return __effect;

}


const obj = {
    name: 'zs',
    age: 12,
    sex: '男'
}
const wrapObj = reactive(obj);
// setTimeout(() => {
//     wrapObj.info = {};
//     setTimeout(() => {
//         delete wrapObj.age;
//         // wrapObj.info.school = 'llyz';
//         console.log(obj);
//     }, 1000)
// },1000)

function mount(instance, el) {
    effect(function () {
        instance.$data && update(instance, el);
    })
    instance.$data = instance.setup();
    update(instance, el);
    function update(instance, el) {
        el.innerHTML = instance.render();
    }
}


function isObject(data) {
    return data && typeof data === 'object';
}