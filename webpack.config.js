/*
* @Author: yishuai
* @Date:   2019-03-03 11:49:21
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-04 16:46:04
*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

var getHtmlConfig = function (name,title) {
  return {
      template: './src/view/' + name + '.html',
      filename: 'view/' + name + '.html',
      title: title,
      inject: true,
      hash: true,
      chunks: ['common','base' ,name],
      // minify: {  
      //   removeAttributeQuotes: true, 
      //   collapseWhitespace: true 
      // },
    }
}

var webpackConfig = {
  mode: 'development',
  entry: {
    index: ['./src/page/index/index.js'],
    login: ['./src/page/login/index.js'],
    common: ['./src/page/common/index.js'],
    result: ['./src/page/result/index.js'],
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      util: __dirname + '/src/util',
      page: __dirname + '/src/page',
      service: __dirname + '/src/service',
      image: __dirname + '/src/image',
      node_modules: __dirname + '/node_modules'
    }
  },
  externals: {
    jquery: 'window.jQuery'
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin(),
      new UglifyjsWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ],
    splitChunks: {
      chunks: "all",
      minSize: 0, // 模块的最小体积
      minChunks: 2, // 模块的最小被引用次数
      name: 'base',
      cacheGroups: { // 缓存组
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [
      // 处理js babel-loader
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // 处理css
      {
        test:/\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      // 处理stylus
      {
        test:/\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ]
      },
      // 处理图片
      {
        test: /\.(png|jpg|jpeg|gif)\??.*$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'
            }
          }
        ]
      },
      // 处理字体
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)\??.*$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'
            }
          }
        ]
      },
      // 处理html模板
      {
        test: /\.string$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    new HtmlWebpackPlugin(getHtmlConfig('login', '用户登录')),
    new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果'))
  ],
  devServer: {
    port: 8080,
    progress: true,
    contentBase: './dist',
    compress: true
  }
}

module.exports = webpackConfig;