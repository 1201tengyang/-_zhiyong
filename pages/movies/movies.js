// pages/movies/movies.js
const API_URL = 'http://t.yushu.im/v2/movie/top250';
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 发送请求获取数据
    wx.request({
      url: API_URL,
      dataType: 'json',
      success: (res) => {
        console.log(res);
        // 更新movies的状态值
        let movies = res.data.subjects;
        this.setData({movies});

        app.data.movies = movies;
      }
    })
  }
})