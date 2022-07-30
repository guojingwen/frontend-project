import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";

var _arguments = typeof arguments === "undefined" ? void 0 : arguments;

import _regeneratorRuntime from "@babel/runtime/regenerator";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.from-entries.js";
import { add, testObjectFromEntries } from './math.js';
import './do.js';

var logger = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var _console;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (_console = console).log.apply(_console, [Date.now()].concat(_toConsumableArray(_arguments)));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function logger() {
    return _ref.apply(this, arguments);
  };
}();

logger(add(1, 2, 3));
var arr = [[1, 2]];
logger('es2022', testObjectFromEntries(arr));
logger('es2022', Object.fromEntries(arr)); // logger('es2022', [1,2,3].at(-1));
// console.log('es2019', '   xxx'.trimStart());
// var a = '"foo" and "bar" and "baz"'
// console.log('es2020', ...a.matchAll(/"([^"]*)"/g));
// console.log('es2021', Promise.any);