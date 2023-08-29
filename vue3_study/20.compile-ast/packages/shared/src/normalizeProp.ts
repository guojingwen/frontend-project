export function normalizeClass(value: unknown): string {
  let res = ''
  if (typeof value === 'string') {
    res = value
  } else if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i])
      if (normalized) {
        res += normalized + ' '
      }
    }
  } else if (Reflect.toString.call(value) === '[object Object]') {
    for (const name in value as object) {
      if ((value as object)[name]) {
        res += name + ' '
      }
    }
  }
  return res.trim()
}
