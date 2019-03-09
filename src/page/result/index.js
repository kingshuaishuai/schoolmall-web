/*
* @Author: kingshuaishuai
* @Date:   2019-03-04 16:22:58
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-09 20:21:01
*/
require('./index.styl')
require('page/common/nav-simple/index.js')
var _sm = require('util/sm.js')

$(function() {
  var type = _sm.getUrlParam('type') || 'default',
      $element = $('.' + type + '-success');
  if(type === 'payment'){
    var orderNumber = _sm.getUrlParam('orderNumber'),
        $orderNumberBox = $element.find('.order-number');
    $orderNumberBox.attr('href',$orderNumberBox.attr('href') + orderNumber)
  }
  // 显示对应提示信息
  $element.show();
})