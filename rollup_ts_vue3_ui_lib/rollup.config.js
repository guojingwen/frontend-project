import nodeResolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import VuePlugin from 'rollup-plugin-vue';
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
// import styles from "rollup-plugin-styles" // 仅支持css 
import postcss from 'rollup-plugin-postcss'; // 支持css 它还内置了支持scss less

export default {
    input: './src/index.ts',
    output: [
        {
            file: './lib/index.umd.js',
            format: 'umd',
            name: 'MyVue3UI',
            globals: {
                vue: 'Vue',
                'element-plus': 'ElementPlus'
            }
        }
    ],
    plugins: [
        peerDepsExternal(),
        nodeResolve({
            browser: true,
            extensions: ['.js', '.ts', '.vue']
        }),
        VuePlugin({
            include: /\.vue$/,
            css: false
        }),
				
				postcss({
					use: ["sass"], // 不写也可以，默认支持scss
				}), // 会读取postcss.config.js
				/* rollup-plugin-postcss 与 rollup-plugin-styles 只能使用一个 */
        /* styles({
            mode: [
                'inject',
                {
                    container: 'head', singleTag: true, prepend: true, attributes: {id: 'global'}
                }
            ],
            minimize: true,
        }), */
        babel({
            exclude: "node_modules/**",
            extensions: ['.js', '.ts', '.vue'],
            babelHelpers: 'runtime',
        }),
        commonjs(),
    ],
    external: [
        'vue',
        'element-plus'
    ]
}