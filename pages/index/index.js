// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		msg: '22222北方汉子'
  },
	

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		// 通常执行异步操作
		// 修改msg的状态值
		console.log(this); // 当前页面的实例对象
		this.setData({
			msg: '北方汉子'
		});


		// 获取用户信息
		wx.getUserInfo({
			success: (res) => {
				console.log(res);
				this.setData({
					userInfo: res.userInfo
				})
			}
		})
  },
	goStudy() {
		// 跳转页面
		wx.switchTab({
			url: '/pages/list/list'
		})
	}
})