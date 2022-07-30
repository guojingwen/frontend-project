export function add(...args){
    return args.reduce((total, item) => total+item, 0);
}
export function testObjectFromEntries(arr) {
    return Object.fromEntries(arr);
}