const path = require('path')

module.exports = {
  // 入口
  entry: "./src/main.js",
  // 输出
  output: {
    path: path.resolve(__dirname, "dist"), // __dirname 表示当前文件的文件夹
    filename: 'static/js/main.js', // js输出文件名
    clean: true // 自动清除打包的文件 - webpack4 中的 cleanMyPlugin插件
  },
  // 加载器
  module: {
    // loader的配置
    rules: [
      // 处理css资源
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      },
      // 处理图片资源
      {
        test: /\.(png|jpe?g|git|webp)$/,
        type: "asset",
        parser: { // 对图片资源进行优化
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb的图片会被base64处理
          }
        },
        generator: {
          // 修改图片打包后输出的文件路径
          filename: 'static/images/[hash:8][ext][query]'
        }
      },
      // 处理字体资源 + 其他资源(视频资源等)
      {
        test: /\.(ttf|woff2?|mp4|mp3|avi)$/,
        type: "asset/resource",
        generator: {
          // 修改字体打包后输出的文件路径
          filename: 'static/media/[hash:8][ext][query]'
        }
      },
    ]
  },
  // 插件
  plugins: [
    // 插件配置
  ],
  // 模式
  mode: "development"
}

