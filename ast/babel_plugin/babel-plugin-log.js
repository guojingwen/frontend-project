const generate = require('@babel/generator') ;

module.exports = function ({ types: t }) {
  return {
    visitor: {
      CallExpression (path) {
				const calleeName = generate.default(path.node.callee).code;
        if (calleeName !== 'console.log') return

        path.shouldSkip = true

        const args = path.node.arguments
        const newArgs = []

        args.forEach((arg, index) => {
          const label = getExpressionLiteral(arg, path)
          newArgs.push(t.stringLiteral(label), arg)
        })
        path.node.arguments = newArgs
      }
    }
  }
}

function getExpressionLiteral (expression, path) {
  const {
    start,
    end
  } = expression
  return path.hub.file.code.slice(start, end)
}