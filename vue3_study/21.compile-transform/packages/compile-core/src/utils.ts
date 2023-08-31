import { NodeTypes } from './ast'

export function isText(node) {
  return [NodeTypes.TEXT].includes(node.type)
}
