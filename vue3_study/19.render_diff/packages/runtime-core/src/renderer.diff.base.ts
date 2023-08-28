import { ShapeFlags } from 'packages/shared/src/shapeFlags'
import { Text, Fragment, isSameVNodeType, createVNode, isVNode } from './vnode'
import {
  ComponentInstance,
  callHook,
  createComponentInstance,
  setupComponent
} from './component'
import { ReactiveEffect } from '@vue/reactivity'
import { queuePostFlushCb } from './scheduler'

export interface RendererOptions {
  setElementText(node: Element, text: string): void
  insert(el, parent: Element, anchor?): void
  createElement(type: string): Element
  patchProp(el: Element, key: string, prevValue: any, nextValue: any): void
  remove(el): void
  createText(text: string)
  setText(node, text): void
  createComment(text: string)
}

export function createRenderer(options?: RendererOptions) {
  const {
    insert: hostInsert,
    createElement: hostCreateElement,
    setElementText: hostSetElementText,
    patchProp: hostPatchProp,
    remove: hostRemove,
    createText: hostCreateText,
    setText: hostSetText,
    createComment: hostCreateComment
  } = options!

  return {
    render
  }
  function render(vnode, container) {
    if (vnode === null) {
      const node = container._vnode?.el
      hostRemove(node)
    } else {
      // 打补丁
      patch(container._vnode, vnode, container)
    }
    // 更新旧节点
    container._vnode = vnode
  }
  function patch(oldVNode, newVNode, container, anchor = null) {
    if (oldVNode === newVNode) return
    if (oldVNode && !isSameVNodeType(oldVNode, newVNode)) {
      hostRemove(container._vnode.el)
      oldVNode = null
    }
    const { type, shapeFlag } = newVNode
    switch (type) {
      case Text:
        processText(oldVNode, newVNode, container, anchor)
        break
      case Comment:
        processCommentNode(oldVNode, newVNode, container, anchor)
        break
      case Fragment:
        processFragment(oldVNode, newVNode, container, anchor)
        break
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(oldVNode, newVNode, container, anchor)
        } else if (shapeFlag & ShapeFlags.COMPONENT) {
          processComponent(oldVNode, newVNode, container, anchor)
        }
    }
  }
  function processComponent(oldVNode, newVNode, container, anchor) {
    if (oldVNode == null) {
      mountComponent(newVNode, container, anchor)
    }
  }
  function mountComponent(initialVNode, container, anchor) {
    initialVNode.component = createComponentInstance(initialVNode)
    const instance = initialVNode.component as ComponentInstance

    // 标准化组件实例
    setupComponent(instance)

    // 设置组件渲染
    setupRenderEffect(instance, initialVNode, container, anchor)
    // console.log(((window as any)._vnode = initialVNode))
  }
  function setupRenderEffect(
    instance: ComponentInstance,
    initialVNode,
    container,
    anchor
  ) {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        const { render, data, beforeMount, mounted } = instance

        if (beforeMount) {
          callHook(beforeMount, instance.data)
        }

        const subTree = (instance.subTree = render?.call(data, data))
        patch(null, subTree, container, anchor)
        initialVNode.el = subTree.el
        instance.isMounted = true

        if (mounted) {
          callHook(mounted, instance.data)
        }
      }
      // 非首次通过schedule()放入微任务在调用run()
      else {
        let { vnode: next, data, render, subTree: prevTree } = instance
        const nextTree = render!.call(data, data)
        instance.subTree = nextTree
        next.el = nextTree.el
        patch(prevTree, nextTree, container, anchor)
      }
    }
    const effect = (instance.effect = new ReactiveEffect(
      componentUpdateFn,
      () => queuePostFlushCb(update)
    ))
    const update = (instance.update = () => effect.run())
    update()
  }
  function processText(oldVNode, newVNode, container, anchor) {
    if (oldVNode == null) {
      newVNode.el = hostCreateText(newVNode.children as string)
      hostInsert(newVNode.el, container, anchor)
    } else {
      const el = (newVNode.el = oldVNode.el)
      if (newVNode.children !== oldVNode.children) {
        hostSetText(el, newVNode.children as string)
      }
    }
  }
  function processCommentNode(oldVNode, newVNode, container, anchor) {
    if (oldVNode == null) {
      newVNode.el = hostCreateComment((newVNode.children as string) || '')
      hostInsert(newVNode.el, container, anchor)
    } else {
      newVNode.el = oldVNode.el
    }
  }
  function processFragment(oldVNode, newVNode, container, anchor) {
    if (oldVNode == null) {
      mountChildren([...newVNode.children], container, anchor)
    } else {
      patchChildren(oldVNode, newVNode, container, anchor)
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
          patchKeyedChildren(c1, c2, container, anchor)
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
          mountChildren(c2, container, anchor)
        } /* else {
          // 新Node 无子节点 什么都不做
        } */
      }
    }
  }
  function patchKeyedChildren(
    oldChildren,
    newChildren,
    container,
    parentAnchor
  ) {
    let i = 0
    const newChildrenLength = newChildren.length
    let oldChildrenEnd = oldChildren.length - 1
    let newChildrenEnd = newChildrenLength - 1
    const normalizeVNode = child =>
      typeof child === 'object' ? child : createVNode(Text, null, String(child))

    // 1. 自前向后比对
    // (a b) c
    // (a b) d e
    while (i <= oldChildrenEnd && i <= newChildrenEnd) {
      const oldVNode = oldChildren[i]
      const newVNode = normalizeVNode(newChildren[i])
      if (isSameVNodeType(oldVNode, newVNode)) {
        patch(oldVNode, newVNode, container, null)
      } else {
        break
      }
      i++
    }

    // 2. 自后向前比对
    // a (b c)
    // d e (b c)
    while (i <= oldChildrenEnd && i <= newChildrenEnd) {
      const oldVNode = oldChildren[oldChildrenEnd]
      const newVNode = normalizeVNode(newChildren[newChildrenEnd])
      if (isSameVNodeType(oldVNode, newVNode)) {
        patch(oldVNode, newVNode, container, null)
      } else {
        break
      }
      oldChildrenEnd--
      newChildrenEnd--
    }

    // 3. 新节点多于旧节点时的 diff 比对。
    if (i > oldChildrenEnd && i <= newChildrenEnd) {
      const nextPos = newChildrenEnd + 1
      const anchor =
        nextPos < newChildrenLength ? newChildren[nextPos].el : parentAnchor
      while (i <= newChildrenEnd) {
        patch(null, normalizeVNode(newChildren[i]), container, anchor)
        i++
      }
    }

    // 4. 旧节点多于新节点时的 diff 比对。
    else if (i > newChildrenEnd && i <= oldChildrenEnd) {
      while (i <= oldChildrenEnd) {
        hostRemove(oldChildren[i].el!)
        i++
      }
    }

    // 5. 乱序的 diff 比对
    else {
      // TODO 这一块最复杂， 后面说
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
      mountChildren(vnode.children, el, anchor)
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
  function mountChildren(children, container, anchor) {
    children.forEach((child, index) => {
      if (!isVNode(child)) {
        children[index] = createVNode(Text, null, String(child))
      }
      patch(null, children[index], container, anchor)
    })
  }
}
