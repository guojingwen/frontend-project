// React ReactDOM 已通过script注入
import '../node_modules/react/umd/react.development.js';
import '../node_modules/react-dom/umd/react-dom.development.js';

function App() {
  const [msg, setMsg] = React.useState('');
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "just only need babel, that can make  react app running"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: msg,
    onChange: e => setMsg(e.target.value),
    placeholder: "please input text"
  }), /*#__PURE__*/React.createElement("p", null, msg));
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( /*#__PURE__*/React.createElement(App, null));