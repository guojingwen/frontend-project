const cssnano = require("cssnano");

module.exports = {
	plugins: [
			require('postcss-preset-env'),
			cssnano({ // css压缩
				preset: "default" // 使用默认配置
			})
	]
}