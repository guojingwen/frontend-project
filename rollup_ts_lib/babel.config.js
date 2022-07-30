
module.exports = {
  "presets": [
      [
          "@babel/preset-env",
          {
              "modules": false, // 默认babel将代码转换成cjs，这里是不转换的意思
          }
      ],
      "@babel/preset-typescript"
  ],
  plugins: [
      "lodash",
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