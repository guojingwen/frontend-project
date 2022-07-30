module.exports = {
    "presets": [
        ["@babel/preset-env",  {
          "modules": false,
          loose: true, // 看得懂的代码
        }],
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: {
            version: 3,
            proposals: true,
          },
          useESModules: true,
        }
      ],
    ]
}