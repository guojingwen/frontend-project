import { baseCompile } from '@vue/compile-core'

export function compile(template: string, options) {
  return baseCompile(template, options)
}
