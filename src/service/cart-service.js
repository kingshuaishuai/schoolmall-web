/*
* @Author: kingshuaishuai
* @Date:   2019-03-04 11:40:32
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-04 13:42:11
*/
var _sm = require('util/sm.js');

var _cart = {
  // 获取购物车数量
  getCartCount(resolve, reject) {
    _sm.request({
      url: _sm.getServerUrl('/cart/get_cart_product_count.do'),
      success: resolve,
      error: reject
    });
  },
  // 添加到购物车
  addToCart(productInfo, resolve, reject) {
    _sm.request({
      url: _sm.getServerUrl('/cart/add.do'),
      data: productInfo,
      success: resolve,
      error: reject
    });
  },
  // 获取购物车列表
  getCartList(resolve, reject) {
    _sm.request({
      url: _sm.getServerUrl('/cart/list.do'),
      success: resolve,
      error: reject
    });
  },
  // 选择购物车商品
  selectProduct(productId, resolve, reject) {
    _sm.request({
      url: _sm.getServerUrl('/cart/select.do'),
      data: {
        productId: productId
      },
      success: resolve,
      error: reject
    })
  },
  // 取消选择购物车商品
  unselectProduct(productId, resolve, reject) {
    _sm.request({
      url: _sm.getServerUrl('/cart/un_select.do'),
      data: {
        productId: productId
      },
      success: resolve,
      error: reject
    });
  },
  // 选中全部商品
  selectAllProduct(resolve, reject) {
    _sm.request({
      url: _sm.getServerUrl('/cart/select_all.do'),
      success: resolve,
      error: reject
    });
  },
  // 取消选中全部商品
  unselectAllProduct(resolve, reject) {
    _sm.request({
      url: _sm.getServerUrl('/cart/un_select_all.do'),
      success: resolve,
      error: reject
    });
  },
  // 更新购物车商品数量
  updateProduct(productInfo, resolve, reject) {
    _sm.request({
      url: _sm.getServerUrl('/cart/update.do'),
      data: productInfo,
      success: resolve,
      error: reject
    });
  },
  // 删除指定商品
  deleteProduct(productIds, resolve, reject) {
    _sm.request({
      url: _sm.getServerUrl('/cart/delete_product.do'),
      data: {
        productIds: productIds
      },
      success: resolve,
      error: reject
    });
  }
}
module.exports = _cart;