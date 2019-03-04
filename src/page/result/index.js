/*
* @Author: kingshuaishuai
* @Date:   2019-03-04 16:22:58
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-04 17:10:03
*/
require('./index.styl')
require('page/common/nav-simple/index.js')
var _sm = require('util/sm.js')

$(function() {
  var type = _sm.getUrlParam('type') || 'default',
      $element = $('.' + type + '-success');
  // 显示对应提示信息
  $element.show();
})