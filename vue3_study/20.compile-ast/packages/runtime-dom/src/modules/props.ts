export function patchDOMProp(el: any, key: string, value: any) {
  try {
    el[key] = value
  } catch (e: any) {}
}
