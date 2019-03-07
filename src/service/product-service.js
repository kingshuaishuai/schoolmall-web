/*
* @Author: kingshuaishuai
* @Date:   2019-03-06 10:48:19
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-07 19:04:04
*/
var _sm = require('util/sm.js')
var _product = {
  // 获取商品列表
  getProductList (listParam, resolve, reject) {
    _sm.request({
      url: _sm.getServerUrl('/product/list.do'),
      data: listParam,
      success: resolve,
      error: reject
    })
  },
  getProductDetail(productId, resolve, reject) {
    _sm.request({
      url: _sm.getServerUrl('/product/detail.do'),
      data: {
        productId: productId
      },
      success: resolve,
      error: reject
    })
  }
}
module.exports = _product;