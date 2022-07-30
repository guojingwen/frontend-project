const {babel} = require('@rollup/plugin-babel');
const nodeResolve = require('@rollup/plugin-node-resolve');
const commonjs = require("@rollup/plugin-commonjs");
const path = require('path');
const pkg = require('./package.json')

const resolve = function(...args) {
  return path.resolve(__dirname, ...args);
};
const input = resolve('./src/index.js')
export default [
  {
    input,
    output: {
        file: resolve(pkg.main),
        format: 'umd',
        name: '$mylib',
    },
    plugins: [
      nodeResolve.default({
        browser: true,
      }),
      commonjs(),
      babel({
        babelHelpers: 'runtime',
        exclude: 'node_modules/**',
      }),
    ],
  }
];