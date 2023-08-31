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
import { createAppAPI } from './apiCreateApp'

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
    render,
    createApp: createAppAPI(render)
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
    /**
     * 举个例子
     * 旧子节点： a     b     c     d     e
     * 新子节点： new-a new-c new-b new-f new-e
     * 0. 初始状态：索引 `i=0` 旧节点结束索引`e1=4` 新节点结束索引`e2=4`
     * 1. 经过场景1 自前到后比对： 索引 `i=1` 旧节点结束索引`e1=4` 新节点结束索引`e2=4`
     * 2. 经过场景2 自后到前比对： 索引 `i=1` 旧节点结束索引`e1=3` 新节点结束索引`e2=3`
     * 3. 新节点和旧节点都存在 跳过场景三和四
     * 4. 进入场景五 剩余元素为
     *    旧子节点： b     c     d
     *    新子节点： new-c new-b new-f
     */
    else {
      // 5.1 创建字典 keyToNewIndexMap {旧子节点索引 => 新子节点索引}
      const oldStartIndex = i
      const newStartIndex = i
      const keyToNewIndexMap = new Map()
      for (i = newStartIndex; i <= newChildrenEnd; i++) {
        const nextChild = normalizeVNode(newChildren[i])
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i)
        }
      }
      // console.log(keyToNewIndexMap)
      // 这时 keyToNewIndexMap 值为
      // Map(3) {3 => 1, 2 => 2, 6 => 3}

      // 5.2 循环 oldChildren ，并尝试进行 patch（打补丁）或 unmount（删除）旧节点
      let j = 0
      // 已经修复的新节点数量, 有三个新节点需要修复，现在都还没修复
      let patched = 0
      // 新节点待修补的数量 = newChildrenEnd - newChildrenStart + 1
      const toBePatched = newChildrenEnd - newStartIndex + 1
      // 标记位：节点是否需要移动
      let moved = false
      // 配合 moved 进行使用，它始终保存当前最大的 index 值
      let maxNewIndexSoFar = 0
      // map字典 {新子节点索引 => 旧子节点索引}
      // 注意 旧子节点索引不包含已处理的节点
      const newIndexToOldIndexMap = new Array(toBePatched).fill(0)
      for (i = oldStartIndex; i <= oldChildrenEnd; i++) {
        const prevChild = oldChildren[i]
        // 如果当前 已经处理的节点数量 > 待处理的节点数量
        // 那么就说明，所有的节点都已经更新完成
        // 剩余的旧节点全部删除即可
        if (patched >= toBePatched) {
          // 所有的节点都已经更新完成，剩余的旧节点全部删除即可
          hostRemove(prevChild.el!)
          continue
        }
        // 新节点需要存在的位置，需要根据旧节点来进行寻找（包含已处理的节点。即：new-c 被认为是 1）
        let newIndex
        if (prevChild.key != null) {
          // 根据旧节点的 key，从 keyToNewIndexMap 中可以获取到新节点对应的位置
          newIndex = keyToNewIndexMap.get(prevChild.key)
        } else {
          // TODO 寻找旧子节点没有key的进行匹配，暂不考虑
        }
        if (newIndex === undefined) {
          // 说明该旧子节点不存在， 直接删除
          hostRemove(prevChild.el!)
          // 这里会删除 `d`
        } else {
          // 该子节点在新旧VNode中都存在
          // 新子节点索引都不包含已计算的元素，即索引从0开始
          // 旧子节点索引+1 有特殊作用
          newIndexToOldIndexMap[newIndex - newStartIndex] = i + 1
          // maxNewIndexSoFar 会存储当前最大的 newIndex，它应该是一个递增的，如果没有递增，则证明有节点需要移动
          if (newIndex >= maxNewIndexSoFar) {
            // 持续递增
            maxNewIndexSoFar = newIndex
          } else {
            // 没有递增，则需要移动，moved = true
            moved = true
          }
          // 打补丁
          patch(prevChild, newChildren[newIndex], container, null)
          // 自增已处理的节点数量
          patched++
        }
      }
      // 5.2会循环3次 得到的 newIndexToOldIndexMap
      // {  1:2,  0:3,         2:0 } // 依次执行的结果
      // 即  b    c   d被删除   最后一个是初始值
      // moved=true 因为遍历 c 的时候算出来它需要移动位置
      // maxNewIndexSoFar=2  只遍历了 b、c、d 它们在新的VNode中b的索引最大，值为2

      // 5.3 针对移动和挂载的处理
      // 仅当节点需要移动的时候，我们才需要生成最长递增子序列，否则只需要有一个空数组即可
      // increasingNewIndexSequence 最大上升子序列索引，如果元素在该数组中则不需要移动
      const increasingNewIndexSequence = moved
        ? getSequence(newIndexToOldIndexMap)
        : []
      // console.log(increasingNewIndexSequence)
      // 针对当前场景 increasingNewIndexSequence 值为 [2]
      // 也就是说 new-b 元素不需要移动
      // 还剩下 new-c 和 new-f需要处理

      // j >= 0 表示：初始值为 最长递增子序列的最后下标
      // j < 0 表示：《不存在》最长递增子序列。
      j = increasingNewIndexSequence.length - 1
      // 倒序循环，以便我们可以使用最后修补的节点作为锚点
      // 这里是先处理 new-f 再处理 new-c
      for (i = toBePatched - 1; i >= 0; i--) {
        // nextIndex（需要更新的新节点下标） = newChildrenStart + i
        const nextIndex = newStartIndex + i
        // 根据 nextIndex 拿到要处理的 新节点
        const nextChild = newChildren[nextIndex]
        // 获取锚点（是否超过了最长长度）
        // parent.insertBefore(child, anchor) 将 child插入到next前面
        // 如果 anchor为 null 表示插入到parent容器的最下面
        const anchor =
          nextIndex + 1 < newChildrenLength
            ? newChildren[nextIndex + 1].el
            : parentAnchor
        // 如果 newIndexToOldIndexMap 中保存的 value = 0，则表示：新节点没有用对应的旧节点，此时需要挂载新节点
        if (newIndexToOldIndexMap[i] === 0) {
          // 挂载新节点
          patch(null, nextChild, container, anchor)
        } else if (moved) {
          /* if (j >= 0 && nextIndex === increasingNewIndexSequence[j]) {
            // 如果索引在最大上升子序列中，则不需要移动位置
            j--
            console.log('不需要移动的元素', nextChild.el)
          } else {
            hostInsert(nextChild.el!, container, anchor)
          } */

          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            hostInsert(nextChild.el!, container, anchor)
          } else {
            j--
            // console.log('不需要移动的元素', nextChild.el)
          }
        }
      }
    }
    /**
     * 总结 patch过程
     * 旧子节点： a     b     c     d     e
     * 新子节点： new-a new-c new-b new-f new-e
     * 1. 更新 a  为 new-a
     * 2. 更新 e  为 new-e
     * 3. 更新 b  为 new-b
     * 4. 更新 c  为 new-c
     * 5. 删除 d
     * 6. 将 new-f 插入到 new-e 前面
     * 7. new-b 在最大上升子序列中， 不需要移动
     * 8. 将 new-c 插入到 new-b 前面
     */
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

function getSequence(arr) {
  if (!arr.length) return []
  if (arr.length < 2) return [0]

  const preIndexs = arr.slice()
  let i, j, start, end, center
  const len = arr.length

  // result存放的是最大上升子序列的下表
  const result = [0]
  for (i = 1; i < len; i++) {
    j = result.at(-1)
    const arrI = arr[i]
    if (arrI === 0) continue // 0表示新增的元素
    const lastIndex = result.at(-1)!
    if (arrI > arr[lastIndex]) {
      preIndexs[i] = j
      result.push(i)
      continue
    }

    start = 0
    end = result.length
    while (start < end) {
      //  >> 右移运算符
      // 等于 Math.floor((u+v)/2);
      // 使用二进制运算可以大幅提高计算效率
      center = (start + end) >> 1
      if (arrI > arr[result[center]]) {
        start = center + 1
      } else {
        end = center
      }
    }
    if (arrI < arr[result[start]]) {
      if (start > 0) {
        preIndexs[i] = result[start - 1]
      }
    }
    result[start] = i
  }
  // console.log(preIndexs);

  end = result.length
  let temp = result[end - 1]
  while (end--) {
    result[end] = temp
    temp = preIndexs[temp]
  }
  return result
}
