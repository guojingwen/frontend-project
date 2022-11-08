/**
 * 反向继承：
 *    使用一个函数接收一个组件作为参数传入，并返回继承该传入组件的类组件
 * 作用：
 *    - 反向继承可以对原组件的state/props/ref/methods/render等进行操作，比属性代理强大的多
 *    - 劫持原组件的生命周期 性能上报
 *    - 劫持渲染  条件渲染 曝光组件
 */
import React from 'react';

// 使用反向继承实现一个性能监控组件
export default function() {
  // return <HeavyComp count={10}></HeavyComp>
  // const Comp = ReverseExtendsPage(HeavyComp);
  // return <Comp count={40}></Comp>
  const _HeavyComp = class extends React.Component {
    render() {
      return <HeavyComp {...this.props}></HeavyComp>
    }
  }
  const Comp = ReverseExtendsPage(_HeavyComp);
  return <Comp count={40}></Comp>
};

function ReverseExtendsPage (Comp) {
  return class extends Comp {
    state = {
      start: Date.now(),
      time: 0,
    }
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      super.componentDidMount?.();
      this.setState({
        time: Date.now() - this.state.start
      });
      // todo 性能上报
    }

    render() {
      return <>
        {super.render()}
        <h2>组件渲染耗时{this.state.time}ms</h2>
      </>
    }
  }
}

// class HeavyComp extends React.Component {
//   state = {}
//   constructor(props) {
//     super(props);
//   }
//   static getDerivedStateFromProps(props, state) {
//     const total = Fibonacci(props.count ?? 0);
//     return {
//       total
//     }
//   }
//   render() {
//     return <h2> Fibonacci (n)  = {this.state.total}</h2>
//   }
// }
const HeavyComp = (props) => {
  const total = Fibonacci(props.count ?? 0);
  return <h2> Fibonacci (n)  = {total}</h2>
}

// 递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误
function Fibonacci (n) {
  if ( n <= 1 ) {return 1};
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

function test(fn, ...args) {
  const start = Date.now();
  console.log(fn(...args), `花费：${Date.now() - start}ms`);
}

// test(Fibonacci, 30);
