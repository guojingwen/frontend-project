import {add} from './pages/a.js';

console.log(add(1,2,3));

Promise.allSettled([
    new Promise((resolve) => {
        setTimeout(() => {
            resolve('asdfs')
        }, 500)
    }),
    Promise.resolve(123),
]).finally(() => {
    console.log('无论成功与失败都会经过这里');
}).then(console.log)
