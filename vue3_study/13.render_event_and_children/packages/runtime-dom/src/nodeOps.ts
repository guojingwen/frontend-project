export const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null)
  },

  createElement: (tag): Element => {
    const el = document.createElement(tag)
    return el
  },

  setElementText: (el, text) => {
    el.textContent = text
  },

  remove: (child: Element) => {
    const parent = child.parentNode
    parent?.removeChild(child)
  }
}
