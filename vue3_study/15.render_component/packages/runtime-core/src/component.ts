import { ShapeFlags } from 'packages/shared/src/shapeFlags'
import { VNode } from './vnode'
import { ReactiveEffect } from '@vue/reactivity'

let uid = 0
export function createComponentInstance(vnode): ComponentInstance {
  const instance = {
    uid: uid++,
    vnode,
    type: vnode.type,
    /**
     * subTree  render函数的返回值
     * 对应要渲染的DOM节点
     **/
    subTree: null,
    effect: null, // ReactiveEffect 实例
    update: null, // update 函数，触发 effect.run
    render: null, // 组件内的 render 函数
    isMounted: false,
    data: null
  }
  return instance
}

export interface ComponentInstance {
  uid: number
  vnode: VNode
  subTree: null | Element
  type: ShapeFlags
  effect: null | ReactiveEffect
  update: null | Function
  render: null | Function
  isMounted: boolean
  data: null | object
}
