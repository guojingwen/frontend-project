module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                "modules": false, // 默认值auto,可能根据browserslist将代码转换成cjs，这里是不转换的意思
            }
        ],
    ],
    plugins: [ // 预设 句法
        "@babel/plugin-proposal-do-expressions",
        [
            "@babel/plugin-transform-runtime",
            {
                corejs: {
                    version: 3,
                    proposals: true,
                },
                useESModules: true,
            }
        ]
    ]
}
