import _toConsumableArray from "@babel/runtime-corejs3/helpers/esm/toConsumableArray";
import _asyncToGenerator from "@babel/runtime-corejs3/helpers/esm/asyncToGenerator";

var _arguments = typeof arguments === "undefined" ? void 0 : arguments;

import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js/instance/concat";
import _Date$now from "@babel/runtime-corejs3/core-js/date/now";
import _Object$fromEntries from "@babel/runtime-corejs3/core-js/object/from-entries";
import { add, testObjectFromEntries } from './math.js';
import './do.js';

var logger = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var _console, _context;

    return _regeneratorRuntime.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            (_console = console).log.apply(_console, _concatInstanceProperty(_context = [_Date$now()]).call(_context, _toConsumableArray(_arguments)));

          case 1:
          case "end":
            return _context2.stop();
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
logger('es2022', _Object$fromEntries(arr)); // logger('es2022', [1,2,3].at(-1));
// console.log('es2019', '   xxx'.trimStart());
// var a = '"foo" and "bar" and "baz"'
// console.log('es2020', ...a.matchAll(/"([^"]*)"/g));
// console.log('es2021', Promise.any);