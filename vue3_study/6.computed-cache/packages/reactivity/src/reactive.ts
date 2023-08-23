import { trigger, track } from './effect'

// Map缓存 obj:observed
export const reactiveMap = new WeakMap<object, any>()

export function reactive(target: object): any {
  if (reactiveMap.has(target)) {
    return reactiveMap.get(target)
  }
  const observed = new Proxy(target, {
    get(target: object, p: string | symbol, receiver: object) {
      const res = Reflect.get(target, p, receiver)
      track(target, p)
      return res
    },
    set(target: object, p: string | symbol, value: unknown, receiver: object) {
      const res = Reflect.set(target, p, value, receiver)
      trigger(target, p)
      return res
    }
  })
  reactiveMap.set(target, observed)
  return observed
}
