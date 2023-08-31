export const isObject = (val: unknown) =>
  val !== null && typeof val === 'object'

export const isString = (val: unknown): val is string => typeof val === 'string'

export const isOn = (key: string) => /^on[^a-z]/.test(key)

/**
 * 用于将 {{ Interpolation }} 值转换为显示的字符串。
 * @private
 */
export const toDisplayString = (val: unknown): string => {
  return String(val)
}
