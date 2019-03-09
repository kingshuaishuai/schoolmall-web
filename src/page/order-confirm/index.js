/*
* @Author: kingshuaishuai
* @Date:   2019-03-08 19:00:02
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-09 16:17:35
*/
require('./index.styl');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var _sm = require('util/sm.js');
var templateProduct = require('./product-list.string');
var templateAddress = require('./address-list.string');
var addressModal = require('./address-modal.js');
var loadingTemplate = require('./loading.string');

var page = {
  data: {
    selectedAddressId: null
  },
  init() {
    this.onLoad()
    this.bindEvent()
  },
  onLoad() {
    this.loadAddressList()
    this.loadProductList()
  },
  bindEvent() {
    var _this = this;
    // 地址选择
    $(document).on('click','.address-item', function () {
      $(this).addClass('active')
             .siblings('.address-item').removeClass('active');
      _this.data.selectedAddressId = $(this).data('id');
    });
    // 订单提交
    $(document).on('click','.order-submit', function () {
      var shippingId = _this.data.selectedAddressId;
      if(shippingId) {
        _order.createOrder({
          shippingId: shippingId
        }, function(res) {
          window.location.href = './payment.html?orderNumber='+res.orderNo;
        }, function(errMsg) {

        })
      } else {
        _sm.errorTips('请选择地址后再提交')
      }
      
    });
    // 地址添加
    $(document).on('click','.address-add', function () {
      addressModal.show({
        isUpdate: false,
        onSuccess: function(){
          _this.loadAddressList()
        }
      })
      
    });
    // 更新收货地址
    $(document).on('click', '.address-update', function(e) {
      e.stopPropagation();
      var shippingId = $(this).parents('.address-item').data('id');
      _address.getAddress(shippingId, function(res){
        addressModal.show({
          isUpdate: true,
          data:res,
          onSuccess(){
            _this.loadAddressList();
          }
        })
      }, function(errMsg){
        _sm.errorTips(errMsg);
      });
    });
    // 删除收货地址
   $(document).on('click','.address-delete', function (e) {
    e.stopPropagation();
      var id = $(this).parents('.address-item').data('id');
      if(window.confirm('确认删除改地址吗？')){
        _address.deleteAddress(id, function(res){
          _this.loadAddressList();
        }, function(errMsg) {
          _sm.errorTips(errMsg)
        })
      }
      
    });
  },
  // 加载地址列表
  loadAddressList() {
    var _this = this,
        loadingHtml = _sm.renderHtml(loadingTemplate);
    $('.address-con').html(loadingHtml);
    _address.getAccessList(function(res){
      _this.addressFilter(res);
      var html = _sm.renderHtml(templateAddress, res);
      $('.address-con').html(html);
    }, function(errMsg) {
      $('.address-con').html('<p class="err-tips">地址加载失败，请刷新后重试</p>');
    })
  },
  // 加载商品列表
  loadProductList(){
    var _this = this,
        loadingHtml = _sm.renderHtml(loadingTemplate);
    $('.product-con').html(loadingTemplate);
    _order.getProductList(function(res){
      var html = _sm.renderHtml(templateProduct, res);
      $('.product-con').html(html);
    }, function(errMsg) {
      $('.product-con').html('<p class="err-tips">商品信息加载失败，请刷新后重试</p>');
    })
  },
  // 处理地址列表中选中状态
  addressFilter(data) {
    if(this.data.selectedAddressId) {
      var selectedAddressIdFlag = false;
      for(var i = 0, length = data.list.length; i < length; i++){
        if(data.list[i].id === this.data.selectedAddressId){
          data.list[i].isActive = true;
          selectedAddressIdFlag = true
        }
      };
      // 如果以前选中的地址不在列表里，将其删除
      if(!selectedAddressIdFlag){
        this.data.selectedAddressId = null
      }
    }
  }
}

$(function(){
  page.init()
})