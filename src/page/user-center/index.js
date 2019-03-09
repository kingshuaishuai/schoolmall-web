/*
* @Author: kingshuaishuai
* @Date:   2019-03-05 11:18:33
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-08 19:18:09
*/
require('./index.styl');
require('page/common/nav/index.js');
require('page/common/header/index.js');
let navSide = require('page/common/nav-side/index.js');
let _user = require('service/user-service.js')
var _sm = require('util/sm.js');
var templateIndex = require('./index.string');

var page = {
  init () {
    this.onLoad()
  },
  onLoad () {
    // 初始化左侧菜单
    navSide.init({
      name: 'user-center'
    })
    // 加载个人信息
    this.loadUserInfo()
  },
  loadUserInfo() {
    var userHtml = ''

    _user.getUserInfo(function(res) {
      userHtml = _sm.renderHtml(templateIndex, res);
      $('.panel-body').html(userHtml);
    }, function(errMsg) {
      _sm.errorTips(errMsg)
    })
  }
}
$(function(){
  page.init()
})