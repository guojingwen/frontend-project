import { ShapeFlags } from 'packages/shared/src/shapeFlags'
import { Text, Fragment } from './vnode'

export interface RendererOptions {
  setElementText(node: Element, text: string): void
  insert(el, parent: Element, anchor?): void
  createElement(type: string): Element
  patchProp(el: Element, key: string, prevValue: any, nextValue: any): void
}

export function createRenderer(options?: RendererOptions) {
  const {
    insert: hostInsert,
    createElement: hostCreateElement,
    setElementText: hostSetElementText,
    patchProp: hostPatchProp
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
      patchElement(oldVNode, newVNode)
    }
  }
  function patchElement(oldVNode, newVNode) {
    const el = (newVNode.el = oldVNode.el)
    const oldProps = oldVNode.props || {}
    const newProps = newVNode.props || {}
    patchChildren(oldVNode, newVNode, el, null)
    patchProps(el, newVNode, oldProps, newProps)
  }
  function patchChildren(oldVNode, newVNode, container, anchor) {
    const c1 = oldVNode?.children
    const c2 = newVNode?.children
    const prevShapeFlag = oldVNode?.shapeFlag || 0
    const shapeFlag = newVNode.shapeFlag
    // 子节点有三种情况 文本节点、多节点、无子节点
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      // 新Node的子节点是文本
      if (prevShapeFlag & prevShapeFlag.ARRAY_CHILDREN) {
        // TODO卸载旧节点
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2)
      }
    } else {
      // 新Node的子节点是多节点 或 无子节点
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        // 旧Node有多个子节点
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          // TODO diff
        } else {
          // TODO 卸载
        }
      } else {
        // 旧Node的子节点是文本节点 或 无子节点
        if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
          // 旧Node的子节点是文本节点
          hostSetElementText(container, '')
        } /* else {
          // 旧Node 无子节点 什么都不做
        } */
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          // TODO 单独挂载新子节点操作
        } /* else {
          // 新Node 无子节点 什么都不做
        } */
      }
    }
  }
  function patchProps(el: Element, vnode, oldProps, newProps) {
    if (oldProps !== newProps) {
      for (const key in newProps) {
        const prev = oldProps[key]
        const next = newProps[key]
        if (next !== prev) {
          hostPatchProp(el, key, prev, next)
        }
      }
    }
    if (oldProps) {
      for (const key in oldProps) {
        if (!(key in newProps)) {
          hostPatchProp(el, key, oldProps[key], null)
        }
      }
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
        hostPatchProp(el, key, null, props[key])
      }
    }
    // 4. 插入
    hostInsert(el, container, anchor)
  }
}
