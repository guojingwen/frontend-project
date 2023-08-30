import { NodeTypes } from './ast'

export function isText(node) {
  return [NodeTypes.INTERPOLATION, NodeTypes.TEXT].includes(node.type)
}
