import React from 'react';

// 属性代理之stateless
function WrapperInput(WrappedComponent) {
  return class extends React.Component {
    state = {
      text: ''
    }
    constructor(props) {
      super(props);
    }
    handleClick = (e) => {
      this.setState({
        text: e.target.value
      })
    }
    render() {
      const newProps = {
        onChange: this.handleClick,
        value: this.state.text,
      }
      return <div>
        <WrappedComponent
        {...newProps}
        {...this.props}/>
        <p>{this.state.text}</p>
      </div>
    }
  }
}

export default function() {
  const MyInput = (props) => {
    return <input {...props}/>
  }
  const Comp = WrapperInput(MyInput)
  return <>
    <p>属性代理之stateless实现双向数据绑定</p>
    <Comp type='text'></Comp>
  </>;
}

