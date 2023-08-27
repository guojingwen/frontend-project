import { ShapeFlags } from 'packages/shared/src/shapeFlags'
import { Text, Fragment } from './vnode'

export interface RendererOptions {
  setElementText(node: Element, text: string): void
  insert(el, parent: Element, anchor?): void
  createElement(type: string)
}

export function createRenderer(options?: RendererOptions) {
  const {
    insert: hostInsert,
    createElement: hostCreateElement,
    setElementText: hostSetElementText
  } = options!

  return {
    render
  }
  function render(vnode, container) {
    if (vnode === null) {
      // TODO 卸载
    } else {
      // 打补丁
      patch(container._vnode, vnode, container)
    }
    // 更新旧节点
    container._vnode = vnode
  }
  function patch(oldVNode, newVNode, container, anchor = null) {
    if (oldVNode === newVNode) return
    const { type, shapeFlag } = newVNode
    switch (type) {
      case Text:
        // TODO
        break
      case Fragment:
        // TODO
        break
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          // TODO
          processElement(oldVNode, newVNode, container, anchor)
        } else if (shapeFlag & shapeFlag.COMPONENT) {
          // TODO
        }
    }
  }
  function processElement(oldVNode, newVNode, container, anchor) {
    if (oldVNode == null) {
      mountElement(newVNode, container, anchor)
    } else {
      // TODO 更新
    }
  }
  function mountElement(vnode, container, anchor) {
    const { type, shapeFlag, props } = vnode
    // 1. 创建元素
    const el = (vnode.el = hostCreateElement(type))
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      // 2. 设置文本
      hostSetElementText(el, vnode.children)
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      // todo
    }
    // 3. 设置props
    if (props) {
      for (const key in props) {
        // TODO
      }
    }
    // 4. 插入
    hostInsert(el, container, anchor)
  }
}
