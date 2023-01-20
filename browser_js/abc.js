Function.prototype.myCall = function (center, ...args) {
  if(isObject(center)) {
    center.that = this;
    const result = center.that(...args);
    delete center.that;
    return result;
  }
}

function isObject (obj) {
  if(['object', 'function'].includes(typeof obj) && obj !== null) {
    return true;
  }
  return false;
}

// shiujhi
