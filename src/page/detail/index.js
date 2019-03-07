/*
* @Author: kingshuaishuai
* @Date:   2019-03-07 16:05:49
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-07 19:57:27
*/
require('./index.styl');
require('page/common/nav/index.js');
require('page/common/header/index.js');
let _product = require('service/product-service.js');
let _cart = require('service/cart-service.js');
var _sm = require('util/sm.js');
var templateIndex = require('./index.string');

var page = {
  data: {
    productId        : _sm.getUrlParam('productId')     || ''
  },
  init() {
    this.onLoad()
    this.bindEvent()
  },
  onLoad() {
    // 如果没有传productId就跳转到首页
    if(!this.data.productId){
      _sm.goHome();
    }
    this.loadDetail()
  },
  bindEvent() {
    var _this = this;
    // 图片预览
    $(document).on('mouseover','.p-img-item', function () {
      var imageUrl = $(this).find('.p-img').attr('src');
      $('.main-img').attr('src', imageUrl);
    });
    // count操作
    $(document).on('click', '.p-count-btn', function () {
      var type = $(this).hasClass('plus') ? 'plus' : 'minus',
          $pCount = $('.p-count'),
          currCount = parseInt($pCount.val()),
          minCount = 0,
          maxCount = _this.data.detailInfo.stock || 0;

      if(type === 'plus'){
        $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
      } else if(type === 'minus') {
        $pCount.val(currCount > minCount ? currCount - 1 : minCount);
      }
    });
    // 加入购物车
    $(document).on('click', '.cart-add', function() {
      var currCount = parseInt($('.p-count').val());
      if(currCount > 0) {
        _cart.addToCart({
          productId: _this.data.productId,
          count: $('.p-count').val()
        }, function (res){
          window.location.href = './result.html?type=cart-add'
        }, function (errMsg) {
          _sm.errorTips(errMsg);
        });
      }
    });
  },
  // 加载list数据
  loadDetail() {
    var _this = this,
        html = '',
        $pageWrap = $('.page-wrap'),
        loadingHtml   = `<div class="loading">
                            <svg class="loading-star" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
                                  <polygon points="29.8 0.3 22.8 21.8 0 21.8 18.5 35.2 11.5 56.7 29.8 43.4 48.2 56.7 41.2 35.1 59.6 21.8 36.8 21.8 " fill="#f36500" />
                               </svg>
                            <div class="loading-circles"></div>
                          </div>
                        `;

    $pageWrap.html(loadingHtml);
    // 请求detail信息
    _product.getProductDetail(this.data.productId, function(res){
      _this.filter(res);
      // 缓存detail信息
      _this.data.detailInfo = res;

      // 渲染html
      html = _sm.renderHtml(templateIndex, res);
      $pageWrap.html(html);
    }, function(errMsg) {
      $pageWrap.html(`<p class="err-tip">此商品太淘气，找不到了~</p>`);
    })
  },
  // subimage数据处理
  filter(data) {
    data.subImages = data.subImages.split(',')
  }
}

$(function(){
  page.init()
})