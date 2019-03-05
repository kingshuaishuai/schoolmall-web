/*
* @Author: yishuai
* @Date:   2019-03-03 12:04:17
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-04 20:37:17
*/
require('./index.styl');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js')
var _sm = require('util/sm.js');

var formError = {
  show (errMsg) {
    $('.error-item').show().find('.err-msg').text(errMsg);
  },
  hide() {
    $('.error-item').hide().find('.err-msg').text('');
  }
};

var page = {
  init(){
    this.bindEvent();
  },
  bindEvent() {
    var _this = this
    // 点击登录按钮
    $('#submit').click(function(e) {
      e.preventDefault()
      _this.submit()
    })
    // 如果按下回车也进行提交
    $('.user-content').keyup(function(e) {
      e.preventDefault()
      // 回车键keyCode为13
      if(e.keyCode === 13) {
        _this.submit();
      }
    })
  },
  // 提交表单 
  submit() {
    var formData = {
          username: $.trim($('#username').val()),
          password: $.trim($('#password').val())
        },
        // 表单验证结果
        validateResult = this.formValidate(formData);

    if(validateResult.status) {
      _user.login(formData, function (res){
        window.location.href = _sm.getUrlParam('redirect') || './index.html';
      }, function (errMsg) {
        formError.show(errMsg);
      })
    } else {
      formError.show(validateResult.msg)
    }

  },
  formValidate(formData) {
    let result = {
      status: false,
      msg: ''
    }
    if(!_sm.validate(formData.username, 'require')){
      result.msg = '用户名不能为空';
      return result;
    }
    if(!_sm.validate(formData.password, 'require')){
      result.msg = '密码不能为空'
      return result;
    }
    result.status = true;
    result.msg = '验证通过';
    return result;
  }
}
$(function() {
  page.init()
})