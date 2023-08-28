export function patchKeyedChildren(
  oldChildren,
  newChildren,
  container,
  anchor
) {
  let i = 0
  const newChildrenLength = newChildren.length
  let oldChildrenEnd = oldChildren.length - 1
  let newChildrenEnd = newChildrenLength - 1

  // 1. 自前向后比对
  // (a b) c
  // (a b) d e
  while (i <= oldChildrenEnd && i <= newChildrenEnd) {
    // TODO
  }

  // 2. 自后向前比对
  // a (b c)
  // d e (b c)
  while (i <= oldChildrenEnd && i <= newChildrenEnd) {
    // TODO
  }

  // 3. 新节点多于旧节点时的 diff 比对。
  if (i > oldChildrenEnd && i <= newChildrenEnd) {
    // TODO 添加剩余新节点
    // 这里也分两种情况
    // (a b) c
    // c (a b)
  }

  // 4. 旧节点多于新节点时的 diff 比对。
  else if (i > newChildrenEnd && i <= oldChildrenEnd) {
    // TODO 删除旧节点
  }

  // 5. 乱序的 diff 比对
  else {
    // TODO 这一块最复杂， 后面说
  }
}
