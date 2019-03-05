/*
* @Author: kingshuaishuai
* @Date:   2019-03-04 21:57:49
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-05 00:17:45
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
  data: {
    username: '',
    question: '',
    answer: '',
    token: ''
  },
  init(){
    this.onLoad();
    this.bindEvent();
  },
  onLoad() {
    this.loadStepUsername();
  },
  bindEvent() {
    var _this = this
    // 输入用户名后下一步的点击
    $('#submit-username').click(function(e) {
      e.preventDefault()
      var username = $.trim($('#username').val());
      if(username) {
        _user.getQuestion(username, function(res) {
          _this.data.username = username;
          _this.data.question = res;
          _this.loadStepQuestion();
          
        }, function (errMsg) {
          formError.show(errMsg)
        })
      } else {
        formError.show('请输入用户名');
      }
    });
    // 输入密码提示问题答案后下一步按钮的点击
    $('#submit-question').click(function(e) {
      e.preventDefault();
      var answer = $.trim($('#answer').val());
      if(answer) {
        // 检查密码提示问题答案
        _user.checkAnswer({
          username: _this.data.username,
          question: _this.data.question,
          answer: answer
        }, function (res) {
          _this.data.answer = answer;
          _this.data.token = res;
          _this.loadStepPassword();
        }, function (errMsg) {
          formError.show(errMsg)
        })
      } else {
        formError.show('请输入密码提示问题答案')
      }
    });
    // 输入新密码后下一步的点击
    $('#submit-password').click(function(e) {
      e.preventDefault();
      var password = $.trim($('#password').val());
      if(password && password.length >= 6) {
        // 检查密码
        _user.resetPassword({
          username: _this.data.username,
          passwordNew: password,
          forgetToken: _this.data.token
        }, function (res) {
          window.location.href = './result.html?type=pass-reset'
        }, function (errMsg) {
          formError.show(errMsg)
        })
      } else {
        formError.show('请输入不少于6位的新密码');
      }
    });
  },
  loadStepUsername() {
    $('.step-username').show();
  },
  loadStepQuestion() {
    // 清除错误提示
    formError.hide();
    // 做容器的切换
    $('.step-username').hide()
      .siblings('.step-question').show()
      .find('.question').text(this.data.question);
  },
  loadStepPassword() {
    formError.hide();
    $('.step-question').hide()
      .siblings('.step-password').show();
  }
}
$(function() {
  page.init()
})