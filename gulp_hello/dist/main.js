"use strict";

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.promise.finally.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/esnext.promise.all-settled.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _a = require("./pages/a.js");

console.log((0, _a.add)(1, 2, 3));
Promise.allSettled([new Promise(function (resolve) {
  setTimeout(function () {
    resolve('asdfs');
  }, 500);
}), Promise.resolve(123)]).finally(function () {
  console.log('无论成功与失败都会经过这里');
}).then(console.log);