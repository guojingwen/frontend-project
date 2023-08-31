import { ReactiveEffect, isReactive } from '@vue/reactivity'
import { queuePostFlushCb } from './scheduler'
import { isObject } from '@vue/shared'

export function watch(
  source: any,
  cb: Function,
  { immediate, deep }: WatchOptions = {}
) {
  let getter: () => any
  if (isReactive(source)) {
    getter = () => source
    deep = true
  } else {
    getter = () => {}
  }
  if (deep) {
    getter = () => traverse(source)
  }

  let oldValue = {}
  const job = () => {
    const newValue = effect.run()
    if (deep || Object.is(newValue, oldValue)) {
      cb(newValue, oldValue)
      oldValue = newValue
    }
  }

  const scheduler = () => queuePostFlushCb(job)
  const effect = new ReactiveEffect(getter, scheduler)
  if (immediate) {
    job()
  } else {
    oldValue = effect.run()
  }
  return () => effect.stop()
}

export interface WatchOptions {
  immediate?: boolean
  deep?: boolean
}

// 遍历代理对象，完成依赖收集
export function traverse(value: unknown) {
  if (!isObject(value)) {
    return value
  }
  for (const key in value as object) {
    // 触发 get 触发依赖收集啊
    traverse((value as object)[key])
  }
  return value
}
