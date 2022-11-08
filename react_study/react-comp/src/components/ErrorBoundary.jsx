import React from 'react';

export default function() {
  return <div>
    <ErrorBoundary>
      <h2>APP1</h2>
      <Child></Child>
    </ErrorBoundary>
    <ErrorBoundary>
      <h2>APP2</h2>
      <Child></Child>
    </ErrorBoundary>
  </div>
}

class Child extends React.Component {
  state = {
    count: 1
  }
  render() {
    if(this.state.count === 3) {
      throw new Error('I crashed!');
    }
    return <>
      <p>{this.state.count}</p>
      <button onClick={
        () => this.setState({count: this.state.count + 1})
      }>add</button>
    </>
  }
}

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  }
  static getDerivedStateFromError(error) {
    // 更新UI
    return {
      hasError: true,
    }
  }
  componentDidMount(error, errorInfo) {
    // todo  这里进行错误上报
    // 你同样可以将错误日志上报给服务器
    console.log(error, errorInfo);
  }
  render() {
    if(this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
