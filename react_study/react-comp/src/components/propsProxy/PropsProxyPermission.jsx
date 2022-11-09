import React from 'react';

// 属性代理 通过渲染劫持实现权限控制
const apiGetPermission = async () => new Promise(resolve => {
  setTimeout(() => {
    resolve(true)
  }, 1000);
});
function PermissionControl(Comp) {
  return function(props){
    let [state, setData] = React.useState({
      hasPermission: false,
      isRequesting: true,
    });
    apiGetPermission().then(res => {
      setData((state) => ({
        ...state,
        hasPermission: res,
        isRequesting: false,
      }))
    });
    if(state.isRequesting) return <p>页面加载中...</p>
    return state.hasPermission ? <Comp {...props}/> : <h2>您访问的页面不存在</h2>
  }
  
}
  
export default PermissionControl(Comp);

function Comp(props) {
  return <h2>个人中心-{props.children}</h2>
}
