/*
* @Author: kingshuaishuai
* @Date:   2019-03-05 11:25:53
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-08 19:18:21
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
    this.onLoad();
    this.bindEvent();
  },
  bindEvent() {
    var _this = this;
    // 点击提交按钮后的动作 
    $(document).on('click', '.btn-submit', function () {
      var userInfo = {
        phone     : $.trim($('#phone').val()),
        email     : $.trim($('#email').val()),
        question  : $.trim($('#question').val()),
        answer    : $.trim($('#answer').val()),
      },
      validateResult = _this.validateFrom(userInfo);
      if(validateResult.status) {
        _user.updateUserInfo(userInfo, function(res,msg) {
          _sm.successTips(msg);
          window.location.href = './user-center.html'
        }, function (errMsg) {
          _sm.errorTips(errMsg)
        })
      } else {
        _sm.errorTips(validateResult.msg)
      }
    })
  },
  validateFrom(formData){
    let result = {
      status: false,
      msg: ''
    }
    if(!_sm.validate(formData.phone, 'require')){
      result.msg = '手机号不能为空'
      return result;
    }
    if(!_sm.validate(formData.phone, 'phone')){
      result.msg = '手机号格式不正确'
      return result;
    }
    if(!_sm.validate(formData.email, 'require')){
      result.msg = '邮箱不能为空'
      return result;
    }
    if(!_sm.validate(formData.email, 'email')){
      result.msg = '邮箱格式不正确'
      return result;
    }
    if(!_sm.validate(formData.question, 'require')){
      result.msg = '密码提示问题不能为空'
      return result;
    }
    if(!_sm.validate(formData.answer, 'require')){
      result.msg = '密码提示问题答案不能为空'
      return result;
    }
    result.status = true;
    result.msg = '验证通过';
    return result;
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