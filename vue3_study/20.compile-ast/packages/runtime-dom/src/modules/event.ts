export function patchEvent(
  el: Element & { _vei?: Object },
  rawName: string,
  prevValue,
  nextValue
) {
  const invokers = el._vei || (el._vei = {})
  const existingInvoker = invokers[rawName]
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue
  } else {
    const name = rawName.slice(2).toLowerCase()
    if (nextValue) {
      const invoker = (invokers[rawName] = createInvoker(nextValue))
      el.addEventListener(name, invoker)
    } else if (existingInvoker) {
      el.removeEventListener(name, existingInvoker)
      invokers[rawName] = undefined
    }
  }
}

function createInvoker(initialVal) {
  const invoker = (...args) => {
    invoker.value?.(...args)
  }
  invoker.value = initialVal
  return invoker
}
