/*
* @Author: kingshuaishuai
* @Date:   2019-03-06 10:45:07
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-07 19:07:43
*/
require('./index.styl');
require('page/common/nav/index.js');
require('page/common/header/index.js');
let _product = require('service/product-service.js');
var _sm = require('util/sm.js');
var templateIndex = require('./index.string');
var Pagination = require('util/pagination/index.js');

var page = {
  data: {
    listParam: {
      keyword        : _sm.getUrlParam('keyword')     || '',
      categoryId     : _sm.getUrlParam('categoryId')  || '',
      orderBy        : _sm.getUrlParam('orderBy')     || 'default',
      pageNum        : _sm.getUrlParam('pageNum')     || 1,
      pageSize       : _sm.getUrlParam('pageSize')    || 15,
    }
  },
  init() {
    this.onLoad()
    this.bindEvent()
  },
  onLoad() {
    this.loadList()
  },
  bindEvent() {
    var _this = this
    // 排序的点击事件
    $('.sort-item').click(function () {
      var $this = $(this);
      _this.data.listParam.pageNum = 1;
      // 点击默认排序
      if($this.data('type') === 'default') {
        if($this.hasClass('active')) {
          return ;
        } 
        // 点击升序降序
        else {
          $this.addClass('active').siblings('.sort-item')
               .removeClass('active asc desc');
          _this.data.listParam.orderBy = 'default';
        }
      } 
      else if($this.data('type') === 'price') {
        $this.addClass('active').siblings('.sort-item')
             .removeClass('active asc desc');

        if(!$this.hasClass('asc')) {
          $this.addClass('asc').removeClass('desc');
          _this.data.listParam.orderBy = 'price_asc';
        } else {
          $this.addClass('desc').removeClass('asc');
          _this.data.listParam.orderBy = 'price_desc';
        }
      }
      // 重新加载列表
      _this.loadList();
    });
  },
  // 加载list数据
  loadList() {
    var _this         =  this,
        listHtml      = '',
        listParam     = this.data.listParam,
        $pListCon     = $('.p-list-con'),
        loadingHtml   = `<div class="loading">
                            <svg class="loading-star" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
                                  <polygon points="29.8 0.3 22.8 21.8 0 21.8 18.5 35.2 11.5 56.7 29.8 43.4 48.2 56.7 41.2 35.1 59.6 21.8 36.8 21.8 " fill="#f36500" />
                               </svg>
                            <div class="loading-circles"></div>
                          </div>
                        `

    // loading
    $pListCon.html(loadingHtml);

    // 删除参数中不必要的字段
    listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId)
    // 请求接口
    _product.getProductList(listParam,function(res){
      listHtml = _sm.renderHtml(templateIndex, {
        list: res.list
      });

      $('.p-list-con').html(listHtml);
      _this.loadPagination({
        hasPreviousPage: res.hasPreviousPage,
        prePage: res.prePage,
        hasNextPage: res.hasNextPage,
        nextPage: res.nextPage,
        pageNum: res.pageNum,
        pages: res.pages
      })
    }, function (errMsg) {
      _sm.errorTips(errMsg);
    })
  },
  // 加载分页信息
  loadPagination(pageInfo){
    var _this = this;
    this.pagination ? '' : (this.pagination = new Pagination());
    this.pagination.render($.extend({}, pageInfo, {
      container: $('.pagination'),
      onSelectPage(pageNum) {
        _this.data.listParam.pageNum = pageNum,
        _this.loadList()
      }
    }))
  }
}

$(function(){
  page.init()
})
