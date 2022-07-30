import {add, testObjectFromEntries} from './math.js';
import './do.js'

const logger = async() => {
    console.log(Date.now(), ...arguments)
}
logger(add(1,2,3));

const arr = [[1,2]];
logger('es2022', testObjectFromEntries(arr));
logger('es2022', Object.fromEntries(arr));
// logger('es2022', [1,2,3].at(-1));



// console.log('es2019', '   xxx'.trimStart());

// var a = '"foo" and "bar" and "baz"'
// console.log('es2020', ...a.matchAll(/"([^"]*)"/g));

// console.log('es2021', Promise.any);