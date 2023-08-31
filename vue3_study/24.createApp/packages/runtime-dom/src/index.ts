import { createRenderer } from '@vue/runtime-core'
import { nodeOps } from './nodeOps'
import { patchProp } from './patchProp'

let renderer
function ensureRenderer(rendererOptions) {
  // 缓存renderer实例
  return (renderer ??= createRenderer(rendererOptions))
}
const rendererOptions = Object.assign({ patchProp }, nodeOps)
export function render(...args) {
  return ensureRenderer(rendererOptions).render(...args)
}

export const createApp = (...args) => {
  const app = ensureRenderer(rendererOptions).createApp(...args)
  const { mount } = app
  // 对该方法进行重构，标准化 container，在重新触发 mount 进行挂载
  app.mount = (containerOrSelector: Element | string) => {
    const container = normalizeContainer(containerOrSelector)
    if (!container) return
    mount(container)
  }
  return app
}

function normalizeContainer(container: Element | string): Element | null {
  if (typeof container === 'string') {
    return document.querySelector(container)
  }
  return container
}
