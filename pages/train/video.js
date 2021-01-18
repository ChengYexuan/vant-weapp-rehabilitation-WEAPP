// pages/train/video.js
import Dialog from '@vant/weapp/dialog/dialog';

Page({
  data: {
    progress: '',
    record: 0,
    gradientColor: {
      '0%': '#ffd01e',
      '100%': '#ee0a24',
    },
    show: false
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onShow: function () {
    var progress = 325; //api
    this.videoContext = wx.createVideoContext('v1')
    this.videoContext.seek(progress)
    this.setData({
      progress: progress
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //api上传时间
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  currentTime: function(e) {
    const total = 330
    if(e.detail.currentTime>=total){
      this.setData({
        show: true
      })
    }
    this.setData({
      record: Math.floor(e.detail.currentTime/total*100)
    })
  },
  
  onClose() {
    this.setData({ show: false });
  },
})