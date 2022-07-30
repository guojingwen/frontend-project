"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.object.to-string.js");

function add() {
  for (var _len = arguments.length, arr = new Array(_len), _key = 0; _key < _len; _key++) {
    arr[_key] = arguments[_key];
  }

  return arr.reduce(function (sum, it) {
    return sum + it;
  }, 0);
}