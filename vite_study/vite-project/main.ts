const ele = document.createElement('h2');
ele.innerText = 'hello vite';
document.body.appendChild(ele);

// 无需任何配置可以加载css
import './src/style.css';
// 仅需 npm i less -D 即支持less文件
import './src/less.less';
// 仅需 npm i sass -D 即支持scss文件
import './src/scss.scss';

// 无需任何配置即可支持ts
import {add} from './src/test';
console.log(add(1, 2, 3));

// 只需任何配置支持图片
import jpg from './src/a.jpeg';
const image = document.createElement('img');
image.setAttribute('src', jpg);
document.body.appendChild(image);

// 无需任何配置即支持jsx
import './src/app.jsx';

// vue 文件需要添加plugin @vitejs/plugin-vue2
import './src/vue_app';
