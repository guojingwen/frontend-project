const _Vue = Vue
return function render(_ctx, _cache) {
  with (_ctx) {
    const {
      toDisplayString: _toDisplayString,
      createElementVNode: _createElementVNode
    } = _Vue
    return _createElementVNode(
      'div',
      [],
      [' hello ' + _toDisplayString(msg) + ' ']
    )
  }
}
