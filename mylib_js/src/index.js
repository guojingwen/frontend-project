export default function () {
    console.log('chat');
    // console.log('es2019', '   xxx'.trimStart());

    // var a = '"foo" and "bar" and "baz"'
    // console.log('es2020', ...a.matchAll(/"([^"]*)"/g));

    // console.log('es2021', Promise.any);
    // console.log('es2022', Object.fromEntries([[1,2]]));
    console.log('es2022', [1,2,3].at(-1));
}
export function compose(...fns) {
    const reduce = Array.prototype.reduce;
    // const fns = arguments;
    return function () {
        return reduce.call(fns,(total, item) => {
            return Promise.resolve(total).then(arg => item(arg));
        }, arguments[0])
    }
}
const f1 = x => x+1;
const f2 = y => y*2;
const f3 = (z) => new Promise(resolve => {
    setTimeout(() => resolve(z-1), 2000);
})
const result = compose(f1, f2, f3)(2);
result.then(console.log)