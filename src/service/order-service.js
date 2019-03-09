/*
* @Author: kingshuaishuai
* @Date:   2019-03-08 19:10:39
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-09 18:56:58
*/

var _sm = require('util/sm.js')
var _order = {
  // 获取商品列表
  getProductList (resolve, reject) {
    _sm.request({
      url: _sm.getServerUrl('/order/get_order_cart_product.do'),
      success: resolve,
      error: reject
    })
  },
  // 提交订单
  createOrder(orderInfo, resolve, reject){
    _sm.request({
      url: _sm.getServerUrl('/order/create.do'),
      data: orderInfo,
      success: resolve,
      error: reject
    })
  },
  // 获取订单列表
  getOrderList(listParam, resolve, reject){
    _sm.request({
      url: _sm.getServerUrl('/order/list.do'),
      data: listParam,
      success: resolve,
      error: reject
    })
  },
  getOrderDetail(orderNumber, resolve, reject){
    _sm.request({
      url: _sm.getServerUrl('/order/detail.do'),
      data: {
        orderNo: orderNumber
      },
      success: resolve,
      error: reject
    })
  },
  // 取消订单
  cancelOrder(orderNumber, resolve, reject){
    _sm.request({
      url: _sm.getServerUrl('/order/cancel.do'),
      data: {
        orderNo: orderNumber
      },
      success: resolve,
      error: reject
    })
  }
}
module.exports = _order;