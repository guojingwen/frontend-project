async function f () {
    console.log('f')
    return 2
}
let x = do {
    console.log('do x 运行了')
    let t = f();
    t * t + 1;
};
console.log('x', x);