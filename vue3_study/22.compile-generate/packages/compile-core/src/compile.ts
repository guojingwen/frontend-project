import { baseParse } from './parse'
import { transform } from './transform'
import { transformElement } from './transforms/transformElements'
import { generate } from './codegen'

export function baseCompile(template: string, options = {}) {
  const ast = baseParse(template)
  transform(
    ast,
    Object.assign(options, {
      nodeTransforms: [transformElement]
    })
  )
  // console.log(JSON.stringify(ast))
  const { code } = generate(ast)
  return new Function(code)()
}
