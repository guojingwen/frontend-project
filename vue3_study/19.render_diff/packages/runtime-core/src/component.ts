import { VNode } from './vnode'
import { ReactiveEffect, reactive } from '@vue/reactivity'

let uid = 0
export function createComponentInstance(vnode): ComponentInstance {
  const type = vnode.type
  const {
    beforeCreate = null,
    created = null,
    beforeMount = null,
    mounted = null
  } = type
  const instance = {
    uid: uid++,
    vnode,
    type,
    /**
     * subTree  render函数的返回值
     * 对应要渲染的DOM节点
     **/
    subTree: null,
    effect: null, // ReactiveEffect 实例
    update: null, // update 函数，触发 effect.run
    render: null, // 组件内的 render 函数
    isMounted: false,
    data: null,
    // 生命周期相关
    beforeCreate,
    created,
    beforeMount,
    mounted
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
  // 生命周期相关
  beforeCreate: null | Function // beforeCreate
  created: null | Function // created
  beforeMount: null | Function // beforeMount
  mounted: null | Function // mounted
}

export function finishComponentSetup(instance: ComponentInstance) {
  if (!instance.render) {
    instance.render = instance.type.render
  }

  const { beforeCreate, created } = instance
  if (beforeCreate) {
    callHook(beforeCreate, null)
  }

  applyOptions(instance)

  if (created) {
    callHook(created, instance.data)
  }
}

export function setupComponent(instance: ComponentInstance) {
  const Component = instance.type
  const { setup } = Component
  if (setup) {
    const setupResult = setup()
    if (typeof setupResult === 'function') {
      instance.render = setupResult
    }
    finishComponentSetup(instance)
  } else {
    finishComponentSetup(instance)
  }
}

export function callHook(hook: Function, proxy) {
  hook.bind(proxy)()
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
