/**
 * 反向继承：
 *    使用一个函数接收一个组件作为参数传入，并返回继承该传入组件的类组件
 * 作用：
 *    - 反向继承可以对原组件的state/props/ref/methods/render等进行操作，比属性代理强大的多
 *    - 劫持原组件的生命周期 性能上报
 *    - 劫持渲染  条件渲染 曝光组件
 */
import React from 'react';

// class组件反向继承 实现性能上报
function PerformanceMonitoring (Comp) {
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
class HeavyComp extends React.Component {
  state = {}
  constructor(props) {
    super(props);
  }
  static getDerivedStateFromProps(props, state) {
    const total = Fibonacci(props.count ?? 36);
    return {
      total
    }
  }
  render() {
    return <h2> Fibonacci (n)  = {this.state.total}</h2>
  }
}
// 符合设计模式里氏替换的思想，
// 任何基类（父类）出现的地方，子类都可以出现出现
// 基类HeavyComp 子类PerformanceMonitoring(HeavyComp)
export default PerformanceMonitoring(HeavyComp);

// function组件 反向继承
/* function PerformanceMonitoring () {
  const start = Date.now();
  let [time, setTime] = React.useState(0);
  const _HeavyComp = class extends React.Component {
    componentDidMount(){
      time = Date.now() - start
      setTime(time);
      // todo这里进行性能上报
    }
    render() {
      return <HeavyComp {...this.props}></HeavyComp>
    }
  }
  const Comp = (_HeavyComp);
  return <>
    <p>渲染耗时{time}ms</p>
    <Comp count={33}></Comp>
  </>
}; 
const HeavyComp = (props) => {
  const total = Fibonacci(props.count ?? 0);
  return <h2> Fibonacci (n)  = {total}</h2>
} */


// ----------------------------------------------------------------------
// 递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误
function Fibonacci (n) {
  if ( n <= 1 ) {return 1};
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}
// 尾递归性能优化
// function Fibonacci2(n, ac1 = 1, ac2 = 1) {
//   if(n <= 1) return ac2;
//   return Fibonacci2(n-1, ac2, ac1+ac2)
// }
