/**
 * 反向继承：
 *    使用一个函数接收一个组件作为参数窜入，并返回继承该传入组件的类组件
 * 作用：
 *    - 反向继承可以对原组件的state/props/ref/methods/render等进行操作，比属性代理强大的多
 *    - 劫持原组件的生命周期 性能上报
 *    - 劫持渲染  条件渲染 曝光组件
 */
import React from 'react';

// 使用反向继承实现一个性能监控组件
export default function ReverseExtendsPage (Comp) {
  return class extends Comp {

  }
}
