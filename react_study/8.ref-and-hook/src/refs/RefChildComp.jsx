import {useRef, Component} from 'react';

export default function RefChildComp () {
  const compRef = useRef();
  return <div>
    <button onClick={handleClick}>focus</button>
    <ChildComp ref={compRef}></ChildComp>
  </div>
  function handleClick() {
    console.log(compRef.current) // 可以拿到子组件的 state props, 实例方法拿不到
  }
}


/**
 * 只能是 class组件，如果是function就不行
 * 可以拿到子组件的 state props, 实例方法拿不到
 */
class ChildComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'zs',
      age: 12
    }
  }
  test() {
    console.log('ChildComp test')
  }
  render() {
    return <h3>I an ChildComp </h3>
  }
}
