import { 
  ReactiveEffect,
  activeEffect,
  triggerEffects
} from './effect'


export function computed(getterOrOptions) {
	// 这里只考虑简单情况 即 getterOrOptions 为 getter
	const getter = getterOrOptions
	return new ComputedRefImpl(getter)
}

export class ComputedRefImpl<T> {
	public dep?: Set<ReactiveEffect> = undefined
	private _value!: T
	private readonly effect: ReactiveEffect<T>

	public _dirty = true

	constructor(getter) {
		this.effect = new ReactiveEffect(getter, () => {
			if (!this._dirty) {
				this._dirty = true
				this.dep && triggerEffects(this.dep)
			}
		})
		this.effect.computed = this
	}
	get value() {
		this.dep ??= new Set<ReactiveEffect>()
		this.dep.add(activeEffect!)
		if (this._dirty) {
			this._dirty = false
			// 执行 run 函数
			this._value = this.effect.run()
		}
		return this._value
	}
}
