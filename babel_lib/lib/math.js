import _reduceInstanceProperty from "@babel/runtime-corejs3/core-js/instance/reduce";
import _Object$fromEntries from "@babel/runtime-corejs3/core-js/object/from-entries";
export function add() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return _reduceInstanceProperty(args).call(args, function (total, item) {
    return total + item;
  }, 0);
}
export function testObjectFromEntries(arr) {
  return _Object$fromEntries(arr);
}