import { ShapeFlags } from 'packages/shared/src/shapeFlags'
import { normalizeClass } from 'packages/shared/src/normalizeProp'

export const Fragment = Symbol('Fragment')
export const Text = Symbol('Text')

export interface VNode {
  __v_isVNode: true
  key: any
  type: any
  props: any
  children: any
  shapeFlag: number
}
export function isVNode(value: any): value is VNode {
  return value ? value.__v_isVNode === true : false
}

export function createVNode(type, props, children?): VNode {
  const shapeFlag =
    typeof type === 'string'
      ? ShapeFlags.ELEMENT
      : Reflect.toString.call(type) === '[object Object]'
      ? ShapeFlags.STATEFUL_COMPONENT
      : 0

  if (props) {
    // 处理 class
    let { class: klass, style: kstyle } = props
    if (klass && typeof klass !== 'string') {
      props.class = normalizeClass(klass)
    }
    // todo style处理与class处理很像， 这里偷懒不写了
    /* if (kstyle  && typeof kstyle !== 'string') {
      props.style = normalizeStyle(kstyle)
    } */
  }
  return createBaseVNode(type, props, children, shapeFlag)
}

export { createVNode as createElementVNode }

function createBaseVNode(type, props, children, shapeFlag) {
  const vnode = {
    __v_isVNode: true,
    type,
    props,
    shapeFlag,
    key: props?.key || null
  } as VNode

  normalizeChildren(vnode, children)
  return vnode
}

export function normalizeChildren(vnode: VNode, children: unknown) {
  let type = 0
  if (children == null) {
    children = null
  } else if (Array.isArray(children)) {
    type = ShapeFlags.ARRAY_CHILDREN
  } else if (typeof children === 'object') {
    // TODO
  } else if (typeof children === 'function') {
    // TODO
  } else {
    children = String(children)
    type = ShapeFlags.TEXT_CHILDREN
  }
  vnode.children = children
  vnode.shapeFlag |= type // 从父节点就能推断出子节点的类型
}
