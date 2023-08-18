export function compose(...fns) {
	const reduce = Array.prototype.reduce;
	// const fns = arguments;
	return function () {
			return reduce.call(fns,(total, item) => {
					return Promise.resolve(total).then(arg => item(arg));
			}, arguments[0])
	}
}


