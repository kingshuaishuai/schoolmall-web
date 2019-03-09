/*
* @Author: kingshuaishuai
* @Date:   2019-03-09 18:04:50
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-09 19:00:23
*/
require('./index.styl');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _sm = require('util/sm.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');

var page = {
  data: {
    orderNumber: _sm.getUrlParam('orderNumber')
  },
  init () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad () {
    // 初始化左侧菜单
    navSide.init({
      name: 'order-list'
    })
    // 加载订单列表
    this.loadDetail()
  },
  bindEvent(){
    var _this = this;
    $(document).on('click','.order-cancel', function(){
      if(window.confirm('确定取消该订单?')){
        _order.cancelOrder(_this.data.orderNumber, function(res){
          _sm.successTips('订单取消成功');
          _this.loadDetail();
        }, function(errMsg){
          _sm.errorTips(errMsg)
        })
      }
    })
  },
  // 加载订单列表
  loadDetail() {
    var _this = this,
        orderDetailHtml = '',
        $content = $('.content');
    _order.getOrderDetail(this.data.orderNumber, function(res){
      _this.dataFilter(res);
     //渲染html
      orderDetailHtml = _sm.renderHtml(templateIndex,res);
      $content.html(orderDetailHtml);
    },function(errMsg){
      $content.html('<p class="err-tip">' + errMsg + '</p>')
    })
  },
  // 数据适配
  dataFilter(data){
    data.needPay = data.status == 10;
    data.isCancelable = data.status == 10;
  }
}
$(function(){
  page.init()
})