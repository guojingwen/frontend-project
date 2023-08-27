import { createRenderer } from '@vue/runtime-core'
import { nodeOps } from './nodeOps'

let renderer
const rendererOptions = Object.assign({}, nodeOps)
export function render(...args) {
  // 缓存renderer实例
  renderer ??= createRenderer(rendererOptions)
  return renderer.render(...args)
}
