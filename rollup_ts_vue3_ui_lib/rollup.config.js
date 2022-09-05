import nodeResolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import VuePlugin from 'rollup-plugin-vue';
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import styles from "rollup-plugin-styles"

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
        styles({
            mode: [
                'inject',
                {
                    container: 'head', singleTag: true, prepend: true, attributes: {id: 'global'}
                }
            ],
            minimize: true,
        }),
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