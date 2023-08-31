import { baseCompile } from '@vue/compile-core'

export function compile(template: string, options?: object) {
  return baseCompile(template, options)
}
