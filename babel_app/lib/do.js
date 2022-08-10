import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
var t;
import _regeneratorRuntime from "@babel/runtime/regenerator";

function f() {
  return _f.apply(this, arguments);
}

function _f() {
  _f = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('f');
            return _context.abrupt("return", 2);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _f.apply(this, arguments);
}

var x = (console.log('do x 运行了'), t = f(), t * t + 1);
console.log('x', x);