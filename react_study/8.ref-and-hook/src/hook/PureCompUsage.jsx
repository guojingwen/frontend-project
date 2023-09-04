import React, { PureComponent } from 'react'

export default class PureCompUsage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    }
  }
  handleClick = () => {
    this.setState({
      count: 10
    })
  }
  render() {
    // console.log('点击一次，这里会执行一次，其实count不变不需要重复渲染')
    console.log('使用了PureComponent 对props和state进行浅比较，数据相同不会再次渲染')
    return (
      <>
      <p>{this.state.count}</p>
      <button onClick={this.handleClick}>ADD to 10</button>
      </>
    )
  }
}

/**
 * 如果function组件怎么避免不必要的渲染呢？
 * - 如果是state，我们判断是否需要setState
 * - 如果是props，则使用memo const NewChild = React.memo(Child);
 */

