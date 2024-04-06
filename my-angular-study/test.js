async function fn1 (ctx, next) {
  console.log('fn1 start')
  await next();
  console.log('fn1 end')
}

async function fn2 (ctx, next) {
  console.log('fn2 start')
  next();
  console.log('fn2 end')
}

function compose(...fns) {
  return function(ctx) {
    return dispatch(0);
    function dispatch(i) {
      const fn = fns[i];
      if(!fn) {
        return Promise.resolve()
      }
      return Promise.resolve(fn(ctx, () => {
        dispatch(i+1)
      }))
    }
  }
}
compose(fn1,fn2)({});

