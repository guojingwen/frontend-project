export function add(...arr){
    return arr.reduce((sum, it) => sum+it, 0);
}