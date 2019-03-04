/*
* @Author: kingshuaishuai
* @Date:   2019-03-04 11:51:31
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-04 13:22:18
*/
var _sm = require('util/sm.js')

var _user = {
  // 用户登录
  login(userInfo, resolve, reject) {
    _sm.request({
      url: _sm.getServerUrl('/user/login.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  // 检查用户名
  checkUsername(username, resolve, reject) {
    _sm.request({
      url: _sm.getServerUrl('/user/check_valid.do'),
      data: {
        type: 'username',
        str: username
      },
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  // 用户注册
  register(userInfo, resolve, reject) {
    _sm.request({
      url: _sm.getServerUrl('/user/register.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  // 检测登录状态
  checkLogin(resolve, reject) {
    _sm.request({
      url: _sm.getServerUrl('/user/get_user_info.do'),
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  // 获取用户密码提示问题
  getQuestion(username, resolve, reject) {
    _sm.request({
      url: _sm.getServerUrl('/user/forget_get_question.do'),
      data: {
        username: username
      },
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  // 检查密码提示问题答案
  checkAnswer(userInfo, resolve, reject) {
    _sm.request({
      url: _sm.getServerUrl('/user/forget_check_answer.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  // 重置密码
  resetPassword(userInfo, resolve, reject){
    _sm.request({
      url: _sm.getServerUrl('/user/forget_reset_password.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  // 获取用户信息
  getUserInfo(resolve,reject){
    _sm.request({
      url: _sm.getServerUrl('/user/get_infomation.do'),
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  // 更新个人信息
  updateUserInfo(userInfo, resolve, reject) {
    _sm.request({
      url: _sm.getServerUrl('/user/update_infomation.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  // 登录状态下更新密码
  updatePassword(userInfo, resolve, reject) {
    _sm.request({
      url: _sm.getServerUrl('/user/reset_password.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  // 退出登录
  logout(resolve, reject) {
    _sm.request({
      url: _sm.getServerUrl('/user/logout.do'),
      method: 'POST',
      success: resolve,
      error: reject
    });
  }
}
module.exports = _user;