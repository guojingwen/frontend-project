import { ReactiveEffect, isReactive } from '@vue/reactivity'
import { queuePostFlushCb } from './scheduler'

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
