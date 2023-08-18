const {babel} = require('@rollup/plugin-babel');
const nodeResolve = require('@rollup/plugin-node-resolve');
const commonjs = require("@rollup/plugin-commonjs");
const tenser = require("@rollup/plugin-terser")
const path = require('path');
const pkg = require('./package.json')

const resolve = function(...args) {
  return path.resolve(__dirname, ...args);
};
const input = resolve('./src/index.ts');
const extensions = ['.js', '.ts'];
const plugins = [
  commonjs(),
  babel({
    babelHelpers: 'runtime',
    exclude: 'node_modules/**',
    extensions,
  }),
	tenser.default(), 
]

export default [
  {
    input,
    output: {
        file: resolve(pkg.browser),
        format: 'umd',
        name: '$mylib',
        globals: {
          loadsh: '_',
        }
    },
    plugins: [
      nodeResolve.default({
        browser: true,
        extensions,
      }),
      ...plugins,
    ],
    external: ['lodash'],
  },
  {
    input,
    output: [
			{ file: pkg.module, format: 'es', globals: {loadsh: '_'}},
      { file: 'lib/mylib.amd.js', format: 'amd', globals: {loadsh: '_'}},
      { file: pkg.main, format: 'cjs', globals: {loadsh: '_'}},
    ],
    plugins: [
      nodeResolve.default({
        extensions,
      }),
      ...plugins,
    ],
    external: ['lodash'],
  }
];
