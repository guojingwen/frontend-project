// React ReactDOM 已通过script注入
import '../node_modules/react/umd/react.development.js';
import '../node_modules/react-dom/umd/react-dom.development.js';

function App() {
    const [msg, setMsg] = React.useState('')
    return <div>
        <h2>just only need babel, that can make  react app running</h2>
        <input type="text" value={msg} onChange={
            e => setMsg(e.target.value)
        } placeholder='please input text'/>
        <p>{msg}</p>
    </div>
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);