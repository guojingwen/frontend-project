import store from './store';
import {observer} from 'mobx-react'


export default function CounterView() {
  return <div>
    <Counter store={store}></Counter>
  </div>
}

const Counter = observer(({
  store
}) => {
  return <div style={{
    'border': '1px solid #ddd',
    padding: '10px'
  }}>
    {store.list.map((it, index) => <span key={index}>{it.id}</span>)}
    <br/>
    <button onClick={store.push}>push</button>
  </div>
})