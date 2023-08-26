import { ReactiveEffect, activeEffect } from './effect'

export function computed(getterOrOptions) {
  // 这里只考虑简单情况 即 getterOrOptions 为 getter
  const getter = getterOrOptions
  return new ComputedRefImpl(getter)
}

export class ComputedRefImpl<T> {
  public dep?: Set<ReactiveEffect> = undefined
  private _value!: T
  private readonly effect: ReactiveEffect<T>
  constructor(getter) {
    this.effect = new ReactiveEffect(getter)
  }
  get value() {
    this.dep ??= new Set<ReactiveEffect>()
    this.dep.add(activeEffect!)
    this._value = this.effect.run()
    return this._value
  }
}
