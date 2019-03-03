/*
* @Author: yishuai
* @Date:   2019-03-03 11:49:21
* @Last Modified by:   yishuai
* @Last Modified time: 2019-03-03 13:18:13
*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

var getHtmlConfig = function (name) {
  return {
      template: './src/view/' + name + '.html',
      filename: 'view/' + name + '.html',
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
    common: ['./src/page/common/index.js']
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
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
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('login'))
  ],
  devServer: {
    port: 3000,
    progress: true,
    contentBase: './dist',
    compress: true
  }
}

module.exports = webpackConfig;