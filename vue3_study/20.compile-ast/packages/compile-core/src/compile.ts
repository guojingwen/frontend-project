import { baseParse } from './parse'

export function baseCompile(template: string, options) {
  const ast = baseParse(template)
  console.log(ast)
  /* transform(
    ast,
    Object.assign(options, {
      nodeTransforms: [transformElement, transformText, transformIf]
    })
  )

  return generate(ast) */
}
