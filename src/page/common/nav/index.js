/*
* @Author: kingshuaishuai
* @Date:   2019-03-04 11:18:39
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-04 14:35:27
*/
require('./index.styl');
var _sm = require('util/sm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

// 导航
var nav = {
  init() {
    this.bindEvent();
    this.loadUserInfo();
    this.loadCartCount();
    return this;
  },
  // 点击事件处理
  bindEvent(){
    // 登录点击事件:跳转到登录页面
    $('.js-login').click(function () {
      _sm.doLogin();
    });
    // 注册点击事件:跳转到注册页面
    $('.js-register').click(function () {
      window.location.href = './user-register.html';
    });
    // 退出登录点击事件
    $('.js-logout').click(function () {
      _user.logout(function(res){
        window.location.reload();
      }, function (errMsg) {
        _mm.errorTips(errMsg);
      })
    })
  },
  // 加载用户信息
  loadUserInfo() {
    _user.checkLogin(function (res) {
      $('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
    }, function (errMsg) {
      // do nothing
    })
  },
  // 加载购物车数量
  loadCartCount() {
    _cart.getCartCount(function(res) {
      $('.nav .cart-count').text(res || 0);
    }, function (errMsg) {
      $('.nav .cart-count').text(0);
    })
  }
}
module.exports = nav.init();