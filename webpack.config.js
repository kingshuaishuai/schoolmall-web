/*
* @Author: yishuai
* @Date:   2019-03-03 11:49:21
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-07 22:51:13
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
      favicon: './favicon.ico',
      // minify: {  
      //   removeAttributeQuotes: true, 
      //   collapseWhitespace: true 
      // },
    }
}

var webpackConfig = {
  mode: 'development',
  entry: {
    'index'             : ['./src/page/index/index.js'],
    'list'              : ['./src/page/list/index.js'],
    'detail'            : ['./src/page/detail/index.js'],
    'cart'              : ['./src/page/cart/index.js'],
    'user-login'        : ['./src/page/user-login/index.js'],
    'user-register'     : ['./src/page/user-register/index.js'],
    'user-pass-reset'   : ['./src/page/user-pass-reset/index.js'],
    'user-pass-update'  : ['./src/page/user-pass-update/index.js'],
    'user-center'       : ['./src/page/user-center/index.js'],
    'user-center-update': ['./src/page/user-center-update/index.js'],
    'common'            : ['./src/page/common/index.js'],
    'result'            : ['./src/page/result/index.js']
  },
  output: {
    filename          : 'js/[name].js',
    path              : path.resolve(__dirname, 'dist'),
    publicPath        : '/'
  },
  resolve: {
    alias: {
      util            : __dirname + '/src/util',
      page            : __dirname + '/src/page',
      service         : __dirname + '/src/service',
      image           : __dirname + '/src/image',
      node_modules    : __dirname + '/node_modules'
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
        test: /\.(png|jpg|jpeg|gif|ico)\??.*$/,
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
    new HtmlWebpackPlugin(getHtmlConfig('index', 'SchoolMall首页')),
    new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表页')),
    new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情页')),
    new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
    new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
    new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
    new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果'))
  ],
  devServer: {
    port: 8080,
    progress: true,
    contentBase: './dist/',
    compress: true,
    disableHostCheck: true,
  }
}

module.exports = webpackConfig;