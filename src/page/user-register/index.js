/*
* @Author: kingshuaishuai
* @Date:   2019-03-04 20:44:26
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-04 21:35:03
*/
require('./index.styl')
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
    // 验证username
    $('#username').blur(function () {
      var username = $.trim($(this).val());
      // 如果用户名为空,不做验证
      if(!username) {
        return ;
      }
      // 异步验证username是否存在
      _user.checkUsername(username, function(res) {
        formError.hide();
      }, function (errMsg) {
        formError.show(errMsg);
      })
    })
    // 点击注册按钮
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
          password: $.trim($('#password').val()),
          passwordConfirm: $.trim($('#password-confirm').val()),
          phone: $.trim($('#phone').val()),
          email: $.trim($('#email').val()),
          question: $.trim($('#question').val()), 
          answer: $.trim($('#answer').val())
        },
        // 表单验证结果
        validateResult = this.formValidate(formData);

    if(validateResult.status) {
      _user.register(formData, function (res){
        window.location.href = './result.html?type=register';
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
    if(formData.password.length < 6){
      result.msg = '密码长度不能小于6位'
      return result;
    }
    if(formData.password !== formData.passwordConfirm){
      result.msg = '两次输入密码不一致'
      return result;
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
  }
}
$(function() {
  page.init()
})