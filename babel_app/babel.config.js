module.exports = {
    "presets": [ // 预设包含某些功能的插件集合，从后往前执行
        [
            "@babel/preset-env",
            {
                // 默认值false，只转换 es6句法，
                // 'usage' 表示按需为es6API提供垫片
                "useBuiltIns": "usage",  
                "corejs": {
                    version: "3.24",
                    proposals: true,
                },
                "modules": false, // 默认babel将代码转换成cjs，这里是不转换的意思
            }
        ],
    ],
    plugins: [ // 插件先于预设执行，插件从前到后依次执行
        "@babel/plugin-proposal-do-expressions",
        "@babel/plugin-transform-runtime"
    ]
}
