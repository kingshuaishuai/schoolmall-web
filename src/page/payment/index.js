/*
* @Author: kingshuaishuai
* @Date:   2019-03-09 19:26:34
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-09 19:56:09
*/
require('./index.styl');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _sm = require('util/sm.js');
var _payment = require('service/payment-service.js');
var templateIndex = require('./index.string');

var page = {
  data: {
    orderNumber: _sm.getUrlParam('orderNumber')
  },
  init () {
    this.onLoad();
  },
  onLoad () {
    // 加载订单列表
    this.loadPaymentInfo()
  },
  // 加载订单列表
  loadPaymentInfo() {
    var _this = this,
        paymentHtml = '',
        $pageWrape = $('.page-wrap');
    _payment.getPaymentInfo(this.data.orderNumber, function(res){
     //渲染html
      paymentHtml = _sm.renderHtml(templateIndex,res);
      $pageWrape.html(paymentHtml);
      _this.listenOrderStatus()
    },function(errMsg){
      $pageWrape.html('<p class="err-tip">' + errMsg + '</p>')
    })
  },
  // 监听订单状态
  listenOrderStatus(){
    var _this = this;
    this.paymentTimer = window.setInterval(function(){
      _payment.getPaymentStatus(_this.data.orderNumber, function(res){
        if(res === true)
        {
          window.location.href = 
            './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
        }
      },function(errMsg){

      })
    },5000);
  }
}
$(function(){
  page.init()
})