/**
 * 判断是否为一个对象
 */
export const isObject = (val: unknown) =>
	val !== null && typeof val === 'object'
