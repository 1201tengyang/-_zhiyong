// pages/detail/detail.js
let datas = require('../../datas/list-data');

let app = getApp();
console.log(app);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCollected: false,
    isMusicPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let index = options.id;
    // 通过index获取对应的数据对象
    let detailObj = datas.list_data[index];
    // 更新数据到当前页面的实例data中
    this.setData({
      detailObj,index
    })

    // 判断用户没有过收藏按钮
    // 异步获取， 重点关注： 回调函数
    // 同步获取
    let collectionFlag = wx.getStorageSync('isCollected')
    if(!collectionFlag){ // 没有点击过
      // 初始化一个空的对象作为缓存数据
      collectionFlag = {};
      // 将空对象添加storage
      wx.setStorage({
        key: 'isCollected',
        data: collectionFlag
      })
    }else { // 之前点击过 {0： true}
      // 获取当前页面的收藏标识
      let isCollected = collectionFlag[index]; // index = 3
      // 分析： 两种情况： 之前的状态值就是false, 之前没有点击过： undefined
      isCollected = isCollected?true: false;
      this.setData({isCollected})
    }

    //  判断当前页面的额音乐是否在播放
    let {isPlay, pageIndex} = app.data;
    if(isPlay && pageIndex === index){ // 是当前页面的音乐在播放
      this.setData({isMusicPlay: true});
    }

    // 监听音乐播放和暂停
    wx.onBackgroundAudioPlay(() => {
      console.log('音乐播放');
      // 修改isMusicPlay的状态值
      this.setData({isMusicPlay: true});
      // 将当前页面播放音乐的标识传入到app实例中
      app.data.isPlay = true;
      app.data.pageIndex = this.data.index;
    })

    wx.onBackgroundAudioPause(() => {
      console.log('音乐暂停');
      this.setData({isMusicPlay: false});
      // 将当前页面播放音乐的标识传入到app实例中
      app.data.isPlay = false;
    })
  },
  handleCollection(){
    // 处理点击是否收藏的功能函数
    // 1. 修改isCollected的状态值
    let isCollected = !this.data.isCollected;
    this.setData({isCollected});

    // 2. 提示是否收藏
    let title = isCollected? '收藏成功': '取消收藏';
    wx.showToast({
      title,
      icon: 'success'
    });


    // 准备工作
    // let obj = {0: true, 1: true, 2: false};

    // 遇到的问题
    // let obj = {};

    // obj[index] = isCollected;

    // 解决方案: 在原有缓存数据的基础上添加新的缓存数据/修改原有的数据
    // 找到原有的数据
    let collectionFlag = wx.getStorageSync('isCollected');
    // console.log(collectionFlag); // {0: false}
    let {index} = this.data;
    collectionFlag[index] = isCollected;
    // 3. 数据缓存
    wx.setStorage({
      key: 'isCollected',
      data: collectionFlag
    })
  },
  musicControl(){
    let isMusicPlay = !this.data.isMusicPlay;
    // 更新isMusicPlay状态值
    this.setData({isMusicPlay});
    let {dataUrl, title} = this.data.detailObj.music
    // 控制音乐播放、暂停
    if(isMusicPlay){
      wx.playBackgroundAudio({
        dataUrl,
        title
      })
      // 将当前页面播放音乐的标识传入到app实例中
      app.data.isPlay = true;
      app.data.pageIndex = this.data.index;

    }else {
      wx.pauseBackgroundAudio()
      // 将当前页面播放音乐的标识传入到app实例中
      app.data.isPlay = true;

    }
  },
  handleShare(){
    wx.showActionSheet({
      itemList: ['分享到朋友圈', '分享到微信好友']
    })
  }
})