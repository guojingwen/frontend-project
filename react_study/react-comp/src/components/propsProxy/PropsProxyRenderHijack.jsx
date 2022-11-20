function AddBorder(Comp) {
  return (props) => {
    return <div  style={{
      border: '6px solid #ccc',
      display: "inline-block"
    }}>
      <Comp {...props}/>
    </div>
  }
}

// @AddBorder // 装饰器写法
function Box(props) {
  return <div style={{
    backgroundColor: 'red',
    color: 'white',
    display: 'flex',
    height: '200px',
    width: '200px',
    alignItems: 'center',
    justifyContent: 'center',
  }}>{props.children}</div>
}

// 属性代理 劫持渲染示例
export default function RenderHijack(props) {
  // return <Box>this is box</Box>
  const Comp = AddBorder(Box);
  return <Comp>这是渲染劫持插入的内容<br/>{props.children}</Comp>
}
