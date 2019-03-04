/*
* @Author: kingshuaishuai
* @Date:   2019-03-04 15:27:53
* @Last Modified by:   kingshuaishuai
* @Last Modified time: 2019-03-04 16:16:51
*/
require('./index.styl');
var _sm = require('util/sm.js');
var templateIndex = require('./index.string');

var navSide = {
  option: {
    name: '',
    navList: [
      {
        name: 'user-center',
        desc: '个人中心',
        href: './user-center.html'
      },
      {
        name: 'order-list',
        desc: '我的订单',
        href: './order-list.html'
      },
      {
        name: 'pass-update',
        desc: '修改密码',
        href: './pass-update.html'
      },
      {
        name: 'about',
        desc: '关于SchoolMall',
        href: './about.html'
      }
    ]
  },
  init (option) {
    // 合并选项
    $.extend(this.option, option)
    this.renderNav();
  },
  // 渲染导航菜单
  renderNav () {
    // 计算active数据
    for(var i = 0, iLength = this.option.navList.length; i < iLength; i++){
      if(this.option.navList[i].name === this.option.name) {
        this.option.navList[i].isActive = true
      }
    }
    // 渲染list数据
    var navHtml = _sm.renderHtml(templateIndex, {
      navList: this.option.navList
    })
    // 把html放入容器
    $('.nav-side').html(navHtml);
  }
}

module.exports = navSide;