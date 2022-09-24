const { SyncHook } = require('tapable');

const syncHook = new SyncHook(['name', 'age']);
syncHook.tap('event1', function(name, age) {
    console.log('event1 of syncHook execed', name, age);
});
syncHook.tap('event2', function(name, age) {
    console.log('event2 of syncHook execed', name, age);
});
// syncHook.call('张三', 25);
/** 
 * 输出
 * - event1 of syncHook execed 张三 25
 * - event2 of syncHook execed 张三 25
 * 
 * 与 eventEmmitter 的区别
 * - 创建实例的时候需要声明参数个数，
 * - 声明几个参数 .tap事件的回调函数就能收到几个参数
 **/


const { SyncBailHook } = require('tapable');
const bailHook = new SyncBailHook(['name', 'age']);
bailHook.tap('event1', function(name, age) {
    console.log('event1 of SyncBailHook execed', name, age);
    // return false;
});
bailHook.tap('event2', function(name, age) {
    console.log('event2 of SyncBailHook execed', name, age);
});
// bailHook.call('李四', 32);
/**
 * SyncBailHook与 SyncHook的区别
 * - 如果前一个事件有返回值（返回值不为undefined）则后续事件不再执行
 * - 类似 DOM事件的 stopImmediatePropagation()
 */

const {SyncWaterfallHook} = require('tapable');
const waterfallHook = new SyncWaterfallHook(['name', 'age']);
waterfallHook.tap('event1', function(name, age) {
    console.log('event1 of SyncWaterfallHook execed', name, age);
    return '王小二';
});
waterfallHook.tap('event2', function(name, age) {
    console.log('event2 of SyncWaterfallHook execed', name, age);
});
// waterfallHook.call('王五', 32);
/**
 * 输出
 * - event1 of SyncWaterfallHook execed 王五 32
 * - event2 of SyncWaterfallHook execed 王小二 32
 * 
 * SyncWaterfallHook 与 SyncHook 的 区别
 * - 如果前一个事件有返回值(返回值不为undefined)，则传给下一个事件
 */

const {SyncLoopHook} = require('tapable');
const loopHook = new SyncLoopHook();
let count = 0;
loopHook.tap('event1', function() {
    count++;
    console.log('event1 of SyncLoopHook execed', count);
    if(count < 2) {
        return true;
    }
    // return '王小二';
});
loopHook.tap('event2', function() {
    count++;
    console.log('event2 of SyncLoopHook execed', count);
    if(count < 4) {
        return true;
    }
});
// loopHook.call();
/**
 *  输出
 * - event1 of SyncLoopHook execed 1
 * - event1 of SyncLoopHook execed 2
 * - event2 of SyncLoopHook execed 3
 * - event1 of SyncLoopHook execed 4
 * - event2 of SyncLoopHook execed 5
 * 
 * 与 SyncHook 的区别
 * - 如果某个事件有返回值（返回值不为undefined）则循环执行包含该事件的之前的所有事件
 */




const { AsyncSeriesHook } = require('tapable');
const seriesHook = new AsyncSeriesHook(['name', 'age']);
seriesHook.tapAsync('event1', (name, age, cb) => {
    console.log('event1 of AsyncSeriesHook execed', name, age);
    setTimeout(() => {
        cb()
    }, 1000)
});
seriesHook.tapPromise('event1', (name, age) => new Promise(
    (resolve) => {
        console.log('event2 of AsyncSeriesHook execed', name, age)
        setTimeout(resolve, 2000)
    }
));
// seriesHook.callAsync('王二小', 12, () => {
//     console.log('all events execed done')
// })
/**
 * 输出
 * - event1 of AsyncSeriesHook execed 王二小 12
 * 间隔1s 
 * - event2 of AsyncSeriesHook execed 王二小 12
 * 间隔2s
 * - all events execed done
 * 
 * AsyncSeriesHook 与 SyncHook 的区别
 * - AsyncSeriesHook是异步串行
 * - 使用 tapAsync 和 tapPromise 代替 tap 这样也是更好的语义化
 * - 使用 callAsync 代替 call
 */

const { AsyncParallelHook } = require('tapable');
const parallelHook = new AsyncParallelHook(['name', 'age']);
parallelHook.tapAsync('event1', (name, age, cb) => {
    setTimeout(() => {
        console.log('event1 of AsyncParallelHook execed done', name, age);
        cb();
    }, 2000)
});
parallelHook.tapPromise('event2', (name, age) => new Promise(
    (resolve) => {
        setTimeout(() => {
            console.log('event2 of AsyncParallelHook execed done', name, age)
            resolve();
        }, 1000);
    }
));
parallelHook.callAsync('王二小', 12, () => {
    console.log('all events execed done')
})
/**
 * 输出
 *   间隔1s
 * - event2 of AsyncParallelHook execed done 王二小 12
 *   在间隔1s
 * - event1 of AsyncParallelHook execed done 王二小 12
 * - all events execed done
 * 
 * AsyncParallelHook 与 SyncHook 的区别
 * - AsyncParallelHook 是异步并行
 */

/**
 * 理解了 sync 与 async,
 * bail 与 waterfall、loop，
 * parallel 与 Series 基本上就掌握了hook
 * 还剩一些组合情况，不需要解释了
 */
const {
    AsyncParallelBailHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook,
    AsyncSeriesLoopHook,
} = require('tapable')