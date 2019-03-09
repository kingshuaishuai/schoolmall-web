/*
* @Author: kingshuaishuai
* @Date:   2019-03-08 23:04:07
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-09 14:56:19
*/
var _sm = require('util/sm.js')
var _address = {
  // 获取收件人列表
  getAccessList (resolve, reject) {
    _sm.request({
      url: _sm.getServerUrl('/shipping/list.do'),
      data: {
        pageSize: 50
      },
      success: resolve,
      error: reject
    })
  },
  // 新建收货地址
  save(addressInfo, resolve, reject) {
    _sm.request({
      url: _sm.getServerUrl('/shipping/add.do'),
      data: addressInfo,
      success: resolve,
      error: reject
    })
  },
  // 更新收货地址
  update(addressInfo, resolve, reject) {
    _sm.request({
      url: _sm.getServerUrl('/shipping/update.do'),
      data: addressInfo,
      success: resolve,
      error: reject
    })
  },
  // 获取单条收件人信息
  getAddress(shippingId, resolve, reject){
    _sm.request({
      url: _sm.getServerUrl('/shipping/select.do'),
      data: {
        shippingId: shippingId
      },
      success: resolve,
      error: reject
    })
  },
  // 删除收件人
  deleteAddress(shippingId, resolve, reject){
    _sm.request({
      url: _sm.getServerUrl('/shipping/del.do'),
      data: {
        shippingId: shippingId
      },
      success: resolve,
      error: reject
    })
  }
}
module.exports = _address;