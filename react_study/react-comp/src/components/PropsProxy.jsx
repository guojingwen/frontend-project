import React from 'react';

/**
 * 属性代理
 * 作用：
 *    - 操作props  
 *    - 抽象state
 * 用途：
 *    - 通过props条件渲染
 *    - 返回stateless的组件 
 *    - warpper传入的组件
 *    - 页面复用
 */

/** 属性代理页面复用案例 */
export default function PropsProxy () {
  const [radio, setRadio] = React.useState(2)
  return <div>
    <label htmlFor="radio1">列表页面A</label>
    <input id="radio1" type="radio" value={1} checked={radio === 1}
    onChange={() => setRadio(1)}/>
    <label htmlFor="radio2">列表页面B</label>
    <input id="radio2" type="radio" value={2} checked={radio === 2}
    onChange={() => setRadio(2)}/>
    {/* <br /> */}
    {radio === 1 ? <PageA/> : <PageB/>}
  </div>
}

const PageA = CommonPageList(
  (props) => props.list.map(it => <p>--{it}</p>),
  fetchListA
);
const PageB = CommonPageList(
  (props) => props.list.map(it => <p>##{it}</p>),
  fetchListB
);

function fetchListA() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([1,2,3]);
    }, 1000)
  })
}
function fetchListB() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(['A', 'B', 'C']);
    }, 300)
  })
}

function CommonPageList (WrappedComponent, fetchingMethod, defaultProps = {
  loading: '加载中。。。',
  emptyText: '没有数据'
}) {
   return class extends React.Component {
      state = {
        list: [],
        isRequesting: true,
      }
      async componentDidMount() {
        const list = await fetchingMethod();
        this.setState({
          list,
          isRequesting: false
        });
      }
      render() {
        if(this.state.isRequesting) {
          return <p>{defaultProps.loading}</p>
        }
        if(!this.state.list.length) {
          return <p>{defaultProps.emptyText}</p>
        }
        return <WrappedComponent 
          {...defaultProps}
          {...this.props}
          list={this.state.list}
        />
      }
   }
}
