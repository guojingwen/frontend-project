
let direction = '';
class ScrollingList extends React.Component {
    constructor(props) {
      super(props);
      this.listRef = React.createRef();
    }
  
    getSnapshotBeforeUpdate(prevProps, prevState) {
      // 我们是否在 list 中添加新的 items ？
      // 捕获滚动​​位置以便我们稍后调整滚动位置。
      if (prevProps.list.length < this.props.list.length) {
        const list = this.listRef.current;
        return list.scrollHeight - list.scrollTop; // 纪录更新前位置
      }
      return null;
    }
  
    componentDidUpdate(prevProps, prevState, snapshot) {
      //（这里的 snapshot 是 getSnapshotBeforeUpdate 的返回值）
      if (snapshot !== null && direction === 'pull-down') {
        const list = this.listRef.current;
        list.scrollTop = list.scrollHeight - snapshot; // 前一页渲染完成，修正视图位置
      }
    }
    // throttle debounce
    onScroll = throttle((e) => {
        // 判断滚动方向，
        // 假如如果是 下拉加载前一页
        direction = 'pull-down'
    }, 300)
    render() {
      return (
        <div ref={this.listRef} onScroll={this.onScroll}>{/* ...contents... */}</div>
      );
    }
  }
