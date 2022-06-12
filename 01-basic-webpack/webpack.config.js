const path = require('path')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

module.exports = {
  // 入口
  entry: "./src/main.js",
  // 输出
  output: {
    path: path.resolve(__dirname, "dist"), // __dirname 表示当前文件的文件夹
    filename: 'static/js/main.js', // js输出文件名
    clean: true // 自动清除打包的文件 - webpack4 中的 cleanMyPlugin插件
  },
  // 加载器（帮助webpack识别一些不能识别的模块）
  module: {
    // loader的配置
    rules: [
      // 处理css资源
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env", // 能解决大多数样式兼容性问题
                ],
              },
            },
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env", // 能解决大多数样式兼容性问题
                ],
              },
            },
          },
          'less-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env", // 能解决大多数样式兼容性问题
                ],
              },
            },
          },
          'sass-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env", // 能解决大多数样式兼容性问题
                ],
              },
            },
          },
          'stylus-loader'
        ]
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
      // 处理js资源
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
          // options: { // 可以替代为babel.config.js
          //   presets: ['@babel/preset-env']
          // }
        }
      }
    ]
  },
  // 插件
  plugins: [
    // 插件配置
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "src")
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "public/index.html"),
    }),
    // css 压缩
    new CssMinimizerPlugin()
  ],
  // 开发服务器 (npx webpack serve - 指令发生改变)
  // 开发服务器是在内存中打包，不会输出资源（不会产生dist目录）
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "8080", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
  },
  // 模式
  mode: "development",
  devtool: "cheap-module-source-map"
}

