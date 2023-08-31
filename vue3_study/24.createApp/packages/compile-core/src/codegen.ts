import { NodeTypes } from './ast'
import {
  CREATE_ELEMENT_VNODE,
  CREATE_VNODE,
  helperNameMap,
  TO_DISPLAY_STRING
} from './runtimeHelpers'

/**
 * 先按照这个拼接
const _Vue = Vue
return function render(_ctx, _cache) {
  with (_ctx) {
    const { createElementVNode: _createElementVNode } = _Vue
    return _createElementVNode(
      "div",
      [],
      ["hello world"]
    )
  }
}
 */
const aliasHelper = (s: symbol) => `${helperNameMap[s]}: _${helperNameMap[s]}`
export function generate(ast) {
  const context = createCodegenContext(ast)
  const { push, newline, indent, deindent, runtimeGlobalName } = context
  genFunctionPreamble(context)
  push(`function render(_ctx, _cache){`)
  indent()

  push(`with(_ctx){`)
  indent()

  const hasHelpers = ast.helpers.length > 0
  if (hasHelpers) {
    const varStrs = ast.helpers.map(aliasHelper).join(',')
    push(`const { ${varStrs} } = _${runtimeGlobalName}`)
  }

  newline()
  push(`return `)
  // 还剩 _createElementVNode("div", [], ["hello world"])
  if (ast.codegenNode) {
    genNode(ast.codegenNode, context)
  } else {
    push('null')
  }

  deindent()
  push(`}`)

  deindent()
  push(`}`)

  console.log(context.code)
  return {
    ast,
    code: context.code
  }
}

function createCodegenContext(ast) {
  const context = {
    code: ``,
    runtimeGlobalName: 'Vue',
    source: ast.loc.source,
    indentLevel: 0, // 锁进级别
    helper(key) {
      return `_${helperNameMap[key]}`
    },
    push(code) {
      context.code += code
    },
    newline() {
      newline(context.indentLevel)
    },
    // 增加锁进+换行
    indent() {
      newline(++context.indentLevel)
    },
    // 减少锁进和换行
    deindent() {
      newline(--context.indentLevel)
    }
  }
  function newline(n: number) {
    context.code += `\n` + ` `.repeat(n)
  }
  return context
}

function genFunctionPreamble(context) {
  const { push, newline, runtimeGlobalName } = context
  push(`const _${runtimeGlobalName} = ${runtimeGlobalName}`)
  newline()
  push('return ')
}

// 表达式处理  4
function genExpression(node, context) {
  const { content, isStatic } = node
  context.push(isStatic ? JSON.stringify(content) : content, node)
}
// {{}} 处理 5
function genInterpolation(node, context) {
  const { push, helper } = context
  push(`${helper(TO_DISPLAY_STRING)}(`)
  genNode(node.content, context)
  push(`)`)
}
// 复合表达式处理 8
function genCompoundExpression(node, context) {
  for (let i = 0; i < node.children!.length; i++) {
    const child = node.children![i]
    if (typeof child === 'string') {
      context.push(child)
    } else {
      genNode(child, context)
    }
  }
}

function genNode(node, context) {
  switch (node.type) {
    case NodeTypes.VNODE_CALL: // 13
      genVNodeCall(node, context)
      break
    case NodeTypes.ELEMENT: // 1
      genNode(node.codegenNode, context)
      break
    case NodeTypes.TEXT: // 2
      genText(node, context)
      break
    // 复合表达式处理 4
    case NodeTypes.SIMPLE_EXPRESSION:
      genExpression(node, context)
      break
    // 表达式处理 5
    case NodeTypes.INTERPOLATION:
      genInterpolation(node, context)
      break
    // {{}} 处理 8
    case NodeTypes.COMPOUND_EXPRESSION:
      genCompoundExpression(node, context)
      break
  }
}

function genVNodeCall(node, context) {
  const { push, helper } = context
  const { tag, props, children, isComponent } = node
  const callHelper = isComponent ? CREATE_VNODE : CREATE_ELEMENT_VNODE
  push(`${helper(callHelper)}(`)
  const args = [tag, props, children].map(arg => arg || null)
  genNodeList(args, context)
  push(`)`)
}

function genText(node, context) {
  context.push(JSON.stringify(node.content))
}

function genNodeList(nodes, context) {
  const { push } = context
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (typeof node === 'string') {
      push(node)
    } else if (Array.isArray(node)) {
      context.push(`[`)
      genNodeList(node, context)
      context.push(`]`)
    } else {
      genNode(node, context)
    }
    if (i < nodes.length - 1) {
      push(', ')
    }
  }
}
