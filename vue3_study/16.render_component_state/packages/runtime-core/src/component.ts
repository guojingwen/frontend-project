import { VNode } from './vnode'
import { ReactiveEffect, reactive } from '@vue/reactivity'

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
  type: any
  effect: null | ReactiveEffect
  update: null | Function
  render: null | Function
  isMounted: boolean
  data: any
}

export function setupComponent(instance: ComponentInstance) {
  if (!instance.render) {
    instance.render = instance.type.render
  }
  applyOptions(instance)
}

function applyOptions(instance: ComponentInstance) {
  const { data: dataOptions } = instance.type
  if (dataOptions) {
    const data = dataOptions()
    if (data && typeof data === 'object') {
      instance.data = reactive(data)
    }
  }
}
