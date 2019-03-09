/*
* @Author: kingshuaishuai
* @Date:   2019-03-07 23:40:26
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-08 19:08:39
*/
require('./index.styl');
var nav = require('page/common/nav/index.js');
require('page/common/header/index.js');
var _cart = require('service/cart-service.js');
var _sm = require('util/sm.js');
var templateIndex = require('./index.string');

var page = {
  data: {

  },
  init() {
    this.onLoad()
    this.bindEvent()
  },
  onLoad() {
    this.loadCart()
  },
  bindEvent() {
    var _this = this;
    // 商品选择和取消选择
    $(document).on('click','.cart-select', function () {
      var $this = $(this),
          productId = $this.parents('.cart-table').data('product-id');
      // 切换选中状态
      if($this.is(':checked')) {
        _cart.selectProduct(productId, function(res){
          _this.renderCart(res)
        }, function(errMsg){
          _this.showCartError()
        })
      } else {
        _cart.unselectProduct(productId, function(res) {
          _this.renderCart(res)
        }, function(errMsg) {
          _this.showCartError()
        })
      }
    });
    // 商品的全选和取消全选
    $(document).on('click','.cart-select-all', function () {
      var $this = $(this);
      // 切换选中状态
      if($this.is(':checked')) {
        _cart.selectAllProduct(function(res){
          _this.renderCart(res)
        }, function(errMsg){
          _this.showCartError()
        })
      } else {
        _cart.unselectAllProduct(function(res) {
          _this.renderCart(res)
        }, function(errMsg) {
          _this.showCartError()
        })
      }
    });
    // 商品数量的变化
    $(document).on('click','.count-btn', function () {
      var $this         = $(this),
          $pCount        = $this.siblings('.count-input'),
          currentCount  = parseInt($pCount.val()),
          type          = $this.hasClass('plus') ? 'plus' : 'minus',
          productId     = $this.parents('.cart-table').data('product-id'),
          minCount      = 1,
          maxCount      = $pCount.data('max'),
          newCount      = 0;

      if(type === 'plus') {
        if(currentCount >= maxCount) {
          _sm.errorTips('该商品数量达到上限');
          return;
        }
        newCount = currentCount + 1;
      }else if(type === 'minus') {
        if(currentCount <= minCount) {
          if(window.confirm('确定要删除该商品吗?')) {
            _this.deleteCartProduct(productId);
          }
          return ;
        }
        newCount = currentCount - 1;
      }
      _cart.updataProduct({
        productId: productId,
        count: newCount
      },function (res) {
        _this.renderCart(res);
      },function(errMsg){
        _this.showCartError();
      })
    });
    // 删除单个商品
    $(document).on('click','.cart-delete', function () {
      var $this = $(this);
      if(window.confirm('确定要删除该商品吗?')) {
        var productId = $this.parents('.cart-table').data('product-id');
        _this.deleteCartProduct(productId);
      }
    });
    // 删除选中商品
    $(document).on('click','.delete-selected', function () {
      var $this = $(this);
        var arrProductIds = [],
            $selectedItem = $('.cart-select:checked');
        // 循环查找选中的productId
        for(var i = 0, iLength=$selectedItem.length; i < iLength; i++){
          arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('productId'));
        }
        if(arrProductIds.length){
          if(window.confirm('确定要删除选中商品吗?')){
            _this.deleteCartProduct(arrProductIds.join(','));
          }else{
            return
          }
        } else{
          _sm.errorTips('您还没有选中要删除的商品');
        }
    });
    // 提交购物车
    $(document).on('click','.btn-submit', function () {
      // 总价大于0才能提交
      console.log(_this.data.cartInfo);
      if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
        window.location.href = './order-confirm.html';
      } else {
        _sm.errorTips('请选择商品后再提交!')
      }
    })
  },
  // 加载list数据
  loadCart() {
    var _this = this;
    _cart.getCartList(function(res){
      _this.renderCart(res)

    }, function(errMsg) {
      _this.showCartError()
    })
  },
  renderCart(data){
    this.filter(data);
    // 缓存购物车信息
    this.data.cartInfo = data;
    //生成html
    var cartHtml = _sm.renderHtml(templateIndex, data);
    $('.page-wrap').html(cartHtml);
    // 通知导航条的购物车更新数量
    nav.loadCartCount();
  },
  // 删除指定商品,支持批量删除,productId用逗号分隔
  deleteCartProduct(productIds) {
    var _this = this;
    _cart.deleteProduct(productIds, function(res){
      _this.renderCart(res)
    },function(errMsg) {
      _this.showCartError();
    })
  },
  
  // subimage数据处理
  filter(data) {
    data.notEmpty = !!data.cartProductVoList.length;
  },
  // 显示错误信息
  showCartError(){
    $('.page-wrap').html('<p class="err-tips">哪里不对了，刷新下试试吧！</p>')
  }
}

$(function(){
  page.init()
})