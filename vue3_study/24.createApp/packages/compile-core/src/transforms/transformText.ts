import { createCompoundExpression, NodeTypes } from '../ast'
import { isText } from '../utils'

/**
 * 将相邻的文本节点和表达式合并为一个表达式。
 *
 * 例如:
 * <div>hello {{ msg }}</div>
 * 上述模板包含两个节点：
 * 1. hello：TEXT 文本节点
 * 2. {{ msg }}：INTERPOLATION 表达式节点
 * 这两个节点在生成 render 函数时，需要被合并： 'hello' + _toDisplayString(_ctx.msg)
 * 那么在合并时就要多出来这个 + 加号。
 * 例如：
 * children:[
 * 	{ TEXT 文本节点 },
 *  " + ",
 *  { INTERPOLATION 表达式节点 }
 * ]
 */
export const transformText = (node, context) => {
  if (
    [
      NodeTypes.ROOT,
      NodeTypes.ELEMENT,
    ].includes(node.type)
  ) {
    return () => {
      const children = node.children
      let currentContainer
      for (let i = 0; i < children.length; i++) {
        const child = children[i]
        if (!isText(child)) {
          continue
        }
        for (let j = i + 1; j < children.length; j++) {
          let next = children[j]
          if (!isText(next)) {
            currentContainer = undefined
            break
          }
          if (!currentContainer) {
            currentContainer = children[i] = createCompoundExpression(
              [child],
              child.loc
            )
          }
          // 在 当前节点 child 和 下一个节点 next 中间，插入 "+" 号
          currentContainer.children.push(` + `, next)
          // 把下一个删除
          children.splice(j, 1)
          j--
        }
      }
    }
  }
}
