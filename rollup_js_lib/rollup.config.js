const {babel} = require('@rollup/plugin-babel');
const nodeResolve = require('@rollup/plugin-node-resolve');
const commonjs = require("@rollup/plugin-commonjs");
const tenser = require("@rollup/plugin-terser")
const path = require('path');
const pkg = require('./package.json')

const resolve = function(...args) {
  return path.resolve(__dirname, ...args);
};
const input = resolve('./src/index.js');
const plugins = [
  commonjs(),
  babel({
    babelHelpers: 'runtime',
    exclude: 'node_modules/**',
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
    },
    plugins: [
      nodeResolve.default({
        browser: true,
      }),
      ...plugins,
    ],
  },
  {
    input,
    output: [
			{ file: pkg.module, format: 'es' },
      { file: 'lib/mylib.amd.js', format: 'amd' },
      { file: pkg.main, format: 'cjs' },
    ],
    plugins: [
      nodeResolve.default(),
      ...plugins,
    ],
  }
];