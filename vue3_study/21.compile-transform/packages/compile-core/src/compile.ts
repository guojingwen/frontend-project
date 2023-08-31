import { baseParse } from './parse'
import { transform } from './transform'
import { transformElement } from './transforms/transformElements'

export function baseCompile(template: string, options = {}) {
  const ast = baseParse(template)
  transform(
    ast,
    Object.assign(options, {
      nodeTransforms: [transformElement]
    })
  )
  // console.log(JSON.stringify(ast))
  // return generate(ast)
}
