class MyNode {
  constructor(public value, public children: MyNode[] | null = null) {}
}

const nodes = new MyNode(1, [
  new MyNode(2, [new MyNode(3), new MyNode(4)]),
  new MyNode(5)
])

const context = {
  nodeTransforms: [
    arg => {
      // console.log(arg?.value) // 这里是先序遍历
      return _arg => console.log(_arg?.value)
    }
    /* arg => {
      // console.log(arg?.value) // 这里是先序遍历
      return _arg => console.log(':: ' + _arg?.value)
    } */
  ]
}
// 按照先序访问 1,2,3,4,5
// 按照后续访问  3,4,2,5,1
traverseNode(nodes, context)

interface TransformContext {
  nodeTransforms: any[]
}
function traverseNode(node: MyNode, context: TransformContext) {
  const { nodeTransforms } = context
  const existFns: any = []
  for (let i = 0; i < nodeTransforms.length; i++) {
    const onExit = nodeTransforms[i](node, context)
    onExit && existFns.push(onExit)
  }

  if (node.children?.length) {
    traverseChildren(node, context)
  }

  let i = existFns.length
  while (i--) {
    existFns[i]?.(node)
  }
}
function traverseChildren(parent: MyNode, context: TransformContext) {
  parent.children!.forEach((node, index) => {
    traverseNode(node, context)
  })
}
