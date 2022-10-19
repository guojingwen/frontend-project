export function add(...args: number[]): number {
  if(!args.length) return 0;
  return args.reduce((sum, item) => sum + item, 0)
}
