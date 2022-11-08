/**
 * 异步组件
 * 随着项目的整张，代码包也随之增长，
 * 为避免因体积过大导致加载时间过程
 * React16.6中引入了React.lazy和React.Susperse两个API，
 * 再配合动态import()语法就可以实现组件代码打包分割和异步加载。
 */

import React, {lazy, Suspense} from 'react';
import { useEffect } from 'react';
 
const About = lazy(() => import(/* webpackChunkName:'about' */ './About'));
// const About = lazy(
//   () => new Promise(resolve => {
//     setTimeout(() => {
//       resolve(import(/* webpackChunkName:'about' */ './About'))
//     }, 500);
//   })
// );
export default function (){
  const [hasLoad, setHasLoad] = React.useState(false);
  return hasLoad ? <LazyComp/> : 
    <button onClick={
      () => setHasLoad(true)
    }>
      加载异步组件
    </button>
}

function LazyComp (){
  return <div>
    <Suspense fallback={<div>loading</div>}>
      <About/>
    </Suspense>
  </div>
}


// 手写 Suspense 组件
class MySuspense extends React.Component {
  state = {
    isRender: true
  }
  componentDidCatch(e) {
    this.setState({
      isRender: false
    });
    e.promise.then(() => {
      /* 数据请求后渲染真实组件 */
      this.setState({ isRender: true });
    })
  }
  render() {
    const {fallback, children} = this.props;
    const {isRender} = this.state;
    return isRender ? children : fallback
  }
}

function myLazy(fn) {
  const fetcher = {
    status: 'pending',
    result: null,
    promise: null
  }
  return function MyComponent() {
    const getDataPromise = fn();
    fetcher.promise = getDataPromise;
    getDataPromise.then(res => {
      fetcher.status = 'resolved';
      fetcher.result = res.default;
    });
    useEffect(() => {
      if (fetcher.status === 'pending') {
        throw fetcher;
      }
    }, []);
    if(fetcher.status === 'resolved') {
      return fetcher.result
    }
    return null;
  }
}
