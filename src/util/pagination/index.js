/*
* @Author: kingshuaishuai
* @Date:   2019-03-06 21:31:08
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-07 16:09:43
*/

require('./index.styl');
var templatePagination = require('./index.string');
var _sm = require('util/sm.js');

var Pagination = function(){
  var _this = this;
  this.defaultOption = {
    container: null,
    pageNum: 1,
    pageRange: 5,
    onSelectPage: null,
  };
  this.start = 1;
  this.end = 5;
  // 事件代理
  $(document).on('click', '.pg-item', function() {
    var $this = $(this);
    // 对于active和disabled的按钮点击不做处理
    if($this.hasClass('active') || $this.hasClass('disabled')){
      return ;
    }
    console.log("start",_this.start)
    typeof _this.option.onSelectPage === 'function'
           ? _this.option.onSelectPage($this.data('value')) : null;
  })
};
// 渲染分页组件
Pagination.prototype.render = function (userOption) {
  // 合并选项
  this.option = $.extend({}, this.defaultOption, userOption);
  // 判断容器是否为合法的jQuery对象
  if(!(this.option.container instanceof jQuery)) {
    return ;
  }
  // 判断是否只有一页
  if(this.option.pages <= 1) {
    return ;
  }
  // 渲染分页内容
  this.option.container.html(this.getPaginationHtml());
};

Pagination.prototype.getPaginationHtml = function () {
  var html = '',
      pageArray = [],
      option = this.option;

  if(option.pageNum < this.start) {
    console.log("start:",this.start)
    this.start = option.pageNum;
    this.end = this.start + option.pageRange -1;
  }
  
  if(option.pageNum > this.end) {
    console.log("pagenum:",option.pageNum,"this.end:",this.end)
    this.end = option.pageNum;
    this.start = (this.end - option.pageRange + 1) < 1 ? 1 : this.end - option.pageRange + 1;
  }

  if(this.end > option.pages){
    this.end = option.pages
  }

  // 上一页按钮的数据
  pageArray.push({
    name: '上一页',
    value: this.option.prePage,
    disabled: !this.option.hasPreviousPage,
  })
  // 数据按钮的处理
  for(var i = this.start; i<= this.end ; i++) {
    pageArray.push({
      name: i,
      value: i,
      active: (i === option.pageNum),
    });
  }
  // 下一页按钮的数据
  pageArray.push({
    name: '下一页',
    value: this.option.nextPage,
    disabled: !this.option.hasNextPage
  })

  html = _sm.renderHtml(templatePagination, {
    pageArray: pageArray,
    pageNum: option.pageNum,
    pages: option.pages
  })

  return html;
};

module.exports = Pagination;
