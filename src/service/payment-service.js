/*
* @Author: kingshuaishuai
* @Date:   2019-03-09 19:30:10
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-09 19:55:18
*/
var _sm = require('util/sm.js')
var _payment = {
  // 获取商品列表
  getPaymentInfo (orderNumber ,resolve, reject) {
    _sm.request({
      url: _sm.getServerUrl('/order/pay.do'),
      data: {
        orderNo: orderNumber
      },
      success: resolve,
      error: reject
    })
  },
  // 获取订单状态
  getPaymentStatus(orderNumber ,resolve, reject) {
    _sm.request({
      url: _sm.getServerUrl('/order/query_order_pay_status.do'),
      data: {
        orderNo: orderNumber
      },
      success: resolve,
      error: reject
    })
  }
}
module.exports = _payment;