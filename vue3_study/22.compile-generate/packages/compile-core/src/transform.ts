import { NodeTypes } from './ast'
import { isSingleElementRoot } from './hoistStatic'


export function createTransformContext(root, { nodeTransforms = [] }) {
  // 记录AST --> JS AST 转换过程的状态
  // 会不断访问和修改该对象下的属性
  const context: TransformContext = {
    nodeTransforms,
    root,
    helpers: new Map(), // 第三阶段generate 从这里根据标记取函数
    currentNode: root,
    parent: null,
    childIndex: 0,
    helper(name) { // 第二阶段生成 JS AST 往里面放 函数标记
      const count = context.helpers.get(name) || 0
      context.helpers.set(name, count + 1)
      return name
    }
  }
  return context
}
export function transform(root, options) {
  const context = createTransformContext(root, options)
  traverseNode(root, context)
  createRootCodegen(root)

  root.helpers = [...context.helpers.keys()]
  
  // 这些属性本阶段用不到还是注释吧，方面上手
  /* root.components = []
  root.directives = []
  root.imports = []
  root.hoists = []
  root.temps = []
  root.cached = [] */
}
export function traverseNode(node, context: TransformContext) {
  context.currentNode = node
  const { nodeTransforms } = context
  const existFns: any = []
  for (let i = 0; i < nodeTransforms.length; i++) {
    const onExit = nodeTransforms[i](node, context)
    if (onExit) {
      existFns.push(onExit)
    }
  }

  switch (node.type) {
    case NodeTypes.ELEMENT:
    case NodeTypes.ROOT:
      traverseChildren(node, context)
      break
    default:
      return
  }

  context.currentNode = node
  let i = existFns.length
  while (i--) {
    existFns[i]()
  }
}
export function traverseChildren(parent, context: TransformContext) {
  parent.children.forEach((node, index) => {
    context.parent = parent
    context.childIndex = index
    traverseNode(node, context)
  })
}

function createRootCodegen(root) {
  const { children } = root
  // Vue2 仅支持单个根节点
  if (children.length === 1) {
    const child = children[0]
    if (isSingleElementRoot(root, child) && child.codegenNode) {
      root.codegenNode = child.codegenNode
    }
  }
}

export interface TransformContext {
  root
  parent: ParentNode | null
  childIndex: number
  currentNode
  helpers: Map<symbol, number>
  helper<T extends symbol>(name: T): T
  nodeTransforms: any[]
}
