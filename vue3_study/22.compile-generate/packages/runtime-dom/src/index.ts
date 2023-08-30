import { createRenderer } from '@vue/runtime-core'
import { nodeOps } from './nodeOps'
import { patchProp } from './patchProp'

let renderer
const rendererOptions = Object.assign({ patchProp }, nodeOps)
// 这里是一种设计模式 叫**依赖注入**，通过参数的形式注入依赖
export function render(...args) {
  // 缓存renderer实例
  renderer ??= createRenderer(rendererOptions)
  return renderer.render(...args)
}
