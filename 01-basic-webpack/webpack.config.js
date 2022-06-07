const path = require('path')

module.exports = {
  // 入口
  entry: "./src/main.js",
  // 输出
  output: {
    path: path.resolve(__dirname, "dist"), // __dirname 表示当前文件的文件夹
    filename: 'main.js' // 输出文件名
  },
  // 加载器
  module: {
    rules: [
        // loader的配置

    ]
  },
  // 插件
  plugins: [
      // 插件配置
  ],
  // 模式
  mode: "development"
}

