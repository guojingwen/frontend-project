import { baseParse } from './parse'
import { transform } from './transform'
import { transformElement } from './transforms/transformElements'
import { transformText } from './transforms/transformText'

export function baseCompile(template: string, options = {}) {
  const ast = baseParse(template)
  transform(
    ast,
    Object.assign(options, {
      nodeTransforms: [transformElement, transformText]
    })
  )
  // console.log(JSON.stringify(ast))
  // return generate(ast)
}
