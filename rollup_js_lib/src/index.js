import {compose} from './utils';

// console.log('es2019', '   xxx'.trimStart());

// var a = '"foo" and "bar" and "baz"'
// console.log('es2020', ...a.matchAll(/"([^"]*)"/g));

// console.log('es2021', Promise.any);
console.log('es2022', Object.fromEntries([[1,2]]));
// console.log('es2022', [1,2,3].at(-1));


// 测试compose
const f1 = x => x+1;
const f2 = (z) => new Promise(resolve => {
    setTimeout(() => resolve(z-1), 2000);
})
const result = compose(f1, f2)(2);
result.then(console.log)
