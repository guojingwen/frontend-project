import { isString } from '@vue/shared'

export function patchStyle(el: Element, prev, next) {
  const style = (el as HTMLElement).style
  const isCssString = isString(next)
  if (next && !isCssString) {
    for (const key in next) {
      // 设置新样式
      setStyle(style, key, next[key])
    }
    // TODO 清理旧样式
  }
}

function setStyle(
  style: CSSStyleDeclaration,
  name: string,
  val: string | string[]
) {
  style[name] = val
}
