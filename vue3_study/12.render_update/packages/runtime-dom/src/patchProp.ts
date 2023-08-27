import { isOn } from '@vue/shared'
import { patchClass } from './modules/class'
import { patchStyle } from './modules/style'
import { patchDOMProp } from './modules/props'
import { patchAttr } from './modules/attrs'

export const patchProp = (el, key, prevValue, nextValue) => {
  if (key === 'class') {
    patchClass(el, nextValue)
  } else if (key === 'style') {
    patchStyle(el, prevValue, nextValue)
  } else if (isOn(key)) {
    // TODO patchEvent
  } else if (shouldSetAsProp(el, key)) {
    // 通过 DOM Properties 指定
    patchDOMProp(el, key, nextValue)
  } else {
    patchAttr(el, key, nextValue)
  }
}

/**
 * 判断指定元素的指定属性是否可以通过 DOM Properties 指定
 * 从源码中copy过来， 了解即可不用背
 */
function shouldSetAsProp(el: Element, key: string) {
  // 各种边缘情况处理
  if (['spellcheck', 'draggable', 'translate'].includes(key)) {
    return false
  }
  // #1787, #2840 表单元素的表单属性是只读的，必须设置为属性 attribute
  if (key === 'form') {
    return false
  }
  // #1526 <input list> 必须设置为属性 attribute
  if (key === 'list' && el.tagName === 'INPUT') {
    return false
  }
  // #2766 <textarea type> 必须设置为属性 attribute
  if (key === 'type' && el.tagName === 'TEXTAREA') {
    return false
  }
  return key in el
}
