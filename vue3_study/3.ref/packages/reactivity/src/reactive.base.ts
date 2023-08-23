// Map缓存 obj:observed
export const reactiveMap = new WeakMap<object, any>()

export function reactive(target: object): any {
  if (reactiveMap.has(target)) {
    return reactiveMap.get(target)
  }
  const observed = new Proxy(target, {
    get(target, p, receiver) {
      const res = Reflect.get(target, p, receiver)
      return res
    },
    set(target, p, value, receiver) {
      const res = Reflect.set(target, p, value, receiver)
      return res
    }
  })
  reactiveMap.set(target, observed)
  return observed
}
