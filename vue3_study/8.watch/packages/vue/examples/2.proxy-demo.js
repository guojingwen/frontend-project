const isObject = val => val !== null && typeof val === 'object'
const toProxy = new WeakMap() // obj:observed

function reactive(obj) {
  if (!isObject(obj)) return obj
  if (toProxy.has(obj)) return toProxy.get(obj)

  const observed = new Proxy(obj, {
    get(target, p, receiver) {
      const res = Reflect.get(target, p, receiver)
      // return res;
      // 体验Proxy惰性劫持
      return isObject(res) ? reactive(res) : res
    },
    set(target, p, value, receiver) {
      const result = Reflect.set(target, p, value, receiver)
      console.log('set', p, value, result)
      return result
    },
    deleteProperty(target, p) {
      const res = Reflect.deleteProperty(target, p)
      console.log('delete', p, res)
      return res
    }
  })
  toProxy.set(obj, observed)
  return observed
}

var state = reactive({
  foo: 'foo',
  bar: { a: 1 }
})
// 1.获取
state.foo // ok
// 2.设置已存在属性
state.foo = 'fooooooo' // ok
// 3.设置不存在属性
state.dong = 'dong' // ok
// 4.删除属性
delete state.dong // ok
// 5.嵌套对象也支持
state.bar.a = 3

// 思考 为什 Proxy 要搭配 Reflect 使用呢？
// 通过查看mdn文档知道
// Reflect相关的方法最后一个参数 receiver 是绑定this的意思
var obj = {
  firstName: '张',
  lastname: '三',
  get fullName() {
    return this.firstName + this.lastname
  }
}
var observed1 = new Proxy(obj, {
  get(target, p, receiver) {
    console.log('触发get', p)
    return target[p]
  },
  set(target, p, value, receiver) {
    target[p] = value
    return true
  }
})
observed1.fullName
// 打印 “触发get fullName” // 只打印一次

var observed2 = new Proxy(obj, {
  get(target, p, receiver) {
    const res = Reflect.get(target, p, receiver)
    console.log('触发get', res)
    return res
  },
  set(target, p, value, receiver) {
    const res = Reflect.set(target, p, value, receiver)
    console.log('set', p, value)
    return res
  }
})
observed2.fullName
// 打印 触发get 张
// 打印 触发get 三
// 打印 触发get 张三
