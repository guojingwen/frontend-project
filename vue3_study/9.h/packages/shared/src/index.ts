export const isObject = (val: unknown) =>
  val !== null && typeof val === 'object'

export const isString = (val: unknown): val is string => typeof val === 'string'
