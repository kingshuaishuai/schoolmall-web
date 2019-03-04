/*
* @Author: yishuai
* @Date:   2019-03-03 13:59:54
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-04 11:53:40
*/
let Hogan = require('hogan.js');

let conf = {
  serverHost : ''
}
let _sm = {
  // 网络请求
  request: function (param){
    var _this = this;
    $.ajax({
      type      : param.method || 'get',
      url       : param.url    || '',
      dataType  : param.type   || 'json',
      data      : param.data   || '',
      success   : function (res) {
        // 请求成功
        if(0 === res.status) {
          typeof param.success === 'function' && param.success(res.data,res.msg);
        }
        // 没有登录状态 需要强制登录
        else if(10 === res.status) {
          _this.doLogin();
        }
        // 请求数据的错误
        else if(1 === res.status) {
          typeof param.error === 'function' && param.error(res.msg);
        }
      },
      error     : function (err){
        typeof param.error === 'function' && param.error(err.statusText);
      }
    })
  },
  //获取服务器地址
  getServerUrl(path){
    return conf.serverHost + path;
  },
  getUrlParam(name) {
    // xxxx.com/product/list.do?keyword=xxx&page=1
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    let result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  },
  // 渲染html模板
  renderHtml(htmlTemplate, data){
    let template = Hogan.compile(htmlTemplate),
        result   = template.render(data);
    return result;
  },
  // 成功提示
  successTips(msg){
    alert(msg || '操作成功');
  },
  // 错误提示
  errorTips(msg){
    alert(msg || '哪里不对了')
  },
  // 字段的验证,支持非空，手机，邮箱
  validate(value, type){
    var value = $.trim(value);
    // 非空验证
    if('require' === type) {
      return !!value;
    }
    //手机验证
    if('phone' === type) {
      return /^1\d{10}$/.test(value);
    }
    // 邮箱验证
    if('email' === type) {
      let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      return pattern.test(value);
    }

  },
  // 统一登录处理
  doLogin: function () {
    window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
  },
  goHome(){
    window.location.href='./index.html';
  }
}

module.exports = _sm;