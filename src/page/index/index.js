/*
* @Author: yishuai
* @Date:   2019-03-03 11:51:32
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-06 00:41:26
*/
require('page/common/nav/index.js')
require('page/common/header/index.js')
require('./index.styl')
require('util/unslider/index.js')
var navSide = require('page/common/nav-side/index.js')
var _sm = require('util/sm.js');

navSide.init({name: 'pass-update'})

var templateBanner = require('./index.string')
$(function() {
  // 渲染banner的html
  var bannerHtml = _sm.renderHtml(templateBanner)
  $('.banner-con').html(bannerHtml)


  // 初始化banner
  var $slider = $('.banner').unslider({
    dots: true
  });

  // 前一张后一张事件绑定
  $('.banner-con .banner-arrow').click(function(){
    var forword = $(this).hasClass('prev') ? 'prev' : 'next';
    $slider.data('unslider')[forword]()
  })
});