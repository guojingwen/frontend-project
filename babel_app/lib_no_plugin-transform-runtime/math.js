import "core-js/modules/es.array.reduce.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.from-entries.js";
export function add() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.reduce(function (total, item) {
    return total + item;
  }, 0);
}
export function testObjectFromEntries(arr) {
  return Object.fromEntries(arr);
}