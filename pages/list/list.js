// pages/list/list.js
let datas = require('../../datas/list-data');
console.log(datas);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      datas: datas.list_data
    })
  },

  toDetail(event){
    console.log(event);
    // 指的是捕获事件的对象
    let id = event.currentTarget.dataset.detailid;
    // 跳转页面
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },
  carouselToDetail(event){
    console.log(event);
    // target指的是触发事件的对象
    let id = event.target.dataset.detailid;
    // 跳转页面
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  }

})