import { isObject } from '@vue/shared'
import { activeEffect, ReactiveEffect } from './effect'
import { reactive } from './reactive'

export function ref(value: unknown) {
  return new RefImpl(value)
}

class RefImpl<T> {
  private _value: T
  private _rawValue: T
  public dep?: Set<ReactiveEffect> = undefined
  constructor(value: T) {
    this._value = toReactive(value)
    this._rawValue = value
  }
  get value() {
    // 收集依赖
    if (activeEffect) {
      this.dep ??= new Set<ReactiveEffect>()
      this.dep.add(activeEffect)
    }
    return this._value
  }
}

export const toReactive = <T extends unknown>(value: T): T =>
  isObject(value) ? reactive(value as object) : value
