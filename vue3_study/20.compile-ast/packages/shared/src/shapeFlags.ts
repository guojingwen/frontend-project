export const enum ShapeFlags {
  ELEMENT = 1,
  // 函数组件
  FUNCTIONAL_COMPONENT = 1 << 1,
  // 有状态（响应数据）组件
  STATEFUL_COMPONENT = 1 << 2,
  TEXT_CHILDREN = 1 << 3,
  ARRAY_CHILDREN = 1 << 4,
  SLOTS_CHILDREN = 1 << 5,
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT
}
