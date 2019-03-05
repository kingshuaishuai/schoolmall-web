/*
* @Author: kingshuaishuai
* @Date:   2019-03-05 13:33:53
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-05 14:05:03
*/
require('./index.styl');
require('page/common/nav/index.js');
require('page/common/header/index.js');
let navSide = require('page/common/nav-side/index.js');
let _user = require('service/user-service.js')
var _sm = require('util/sm.js');

var page = {
  init () {
    this.onLoad();
    this.bindEvent();
  },
  bindEvent() {
    var _this = this;
    // 点击提交按钮后的动作 
    $(document).on('click', '.btn-submit', function () {
      var passInfo = {
        password         : $.trim($('#password').val()),
        passwordNew      : $.trim($('#password-new').val()),
        passwordConfirm  : $.trim($('#password-confirm').val()),
      },
      validateResult = _this.validateFrom(passInfo);
      if(validateResult.status) {
        _user.updatePassword({
          passwordOld: passInfo.password,
          passwordNew: passInfo.passwordNew
        }, function(res,msg) {
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
    // 原密码是否为空
    if(!_sm.validate(formData.password, 'require')){
      result.msg = '原密码不能为空';
      return result;
    }
    if(!formData.passwordNew || formData.passwordNew.length < 6){
      result.msg = '密码长度不得少于6位';
      return result;
    }
    if(formData.passwordNew !== formData.passwordConfirm)
    {
      result.msg = '两次输入的密码不一致';
      return result;
    }
    
    result.status = true;
    result.msg = '验证通过';
    return result;
  },
  onLoad () {
    // 初始化左侧菜单
    navSide.init({
      name: 'user-pass-update'
    })
  }
}
$(function(){
  page.init()
})