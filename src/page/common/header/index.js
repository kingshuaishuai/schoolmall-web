/*
* @Author: kingshuaishuai
* @Date:   2019-03-04 14:01:35
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-06 10:55:06
*/
require('./index.styl')
var _sm = require('util/sm.js')

// 通用页面头部
var header = {
  init() {
    this.bindEvent();
    this.onLoad();
    return this;
  },
  onLoad() {
    var keyword = _sm.getUrlParam('keyword');
    // keyword存在则回填到输入框
    if(keyword) {
      $('#search-input').val(keyword);
    }
  },
  bindEvent() {
    let _this = this
    $('#search-btn').click(function () {
      _this.searchSubmit();
    });
    // 输入回车也提交
    $('#search-input').keyup(function(e) {
      // 13是回车键
      if(e.keyCode === 13) {
        _this.searchSubmit();
      }
    })
  },
  // 搜索提交
  searchSubmit() {
    let keyword = $.trim($('#search-input').val());
    // 如果提交的时候有keyword,正产跳转到list.html
    if(keyword) {
      window.location.href = './list.html?keyword=' + keyword;
    } else {
      // 如果没有keyword，就返回主页
      _sm.goHome()
    }
  }
}
header.init();