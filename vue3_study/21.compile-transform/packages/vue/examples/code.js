// 注意：实际得到的是字符串，这里是为了方便理解

const _Vue = Vue
return function render(_ctx, _cache) {
  with (_ctx) {
    const { createElementVNode: _createElementVNode } = _Vue
    
    return _createElementVNode(
      "div",
      [],
      [
        "\\n        ",
        _createElementVNode(
          "h2",
          [],
          ["hello world"]
        ),
        "\\n    "
      ]

    )
  }
}
