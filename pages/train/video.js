// pages/train/video.js
import Dialog from '@vant/weapp/dialog/dialog';
const exerDoc = require('../../static/exer.js')
const app = getApp()

Page({
  data: {
    videoURL: '',
    record: 0, //记录播放进度
    percent: 0,
    text: '', //提示信息： 恭喜你完成训练！ 或者  开始下一步吧！
    gradientColor: {
      '0%': '#ffd01e',
      '100%': '#ee0a24',
    },
    show: false,
    index: 0, //训练步骤
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 页面显示时--获取全局变量、自动定位视频进度
   */
  onShow: function () {
    this.setData({
      index: app.globalData.index,
      record: app.globalData.progressTime,
      // videoURL: exerDoc[index].video
      videoURL: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
    })
    this.videoContext = wx.createVideoContext('v')
    this.videoContext.seek(this.data.record)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 页面卸载时--上传record到后端
   */
  onUnload: function () {
    // wx.request({
    //   url: ipstr + '/plan/process',
    //   method: "PUT",
    //   data: {
    //     userID: app.globalData.id,
    //     actionNum: this.data.index,
    //     actionSec: this.data.record
    //   }
    // })
    app.globalData.progressTime = this.data.record
    console.log(this.data.index)
    console.log(this.data.record)
  },

  /**
   * 播放进度发生变化时--更新record、结束时弹出对话框
   */
  currentTime: function(e) {
    const total = e.detail.duration
    this.setData({
      record: Math.floor(e.detail.currentTime),
      percent: Math.floor(e.detail.currentTime/total*100)
    })
    if (e.detail.currentTime >= total) {
      // 是异步执行么？
      this.setData({
        show: true
      })
      if (this.data.index === -1) {
        this.setData({
          text: '恭喜你完成训练！'
        })
      }
      else{
        this.setData({
          text: '开始下一步吧！'
        })
      }
    }
    console.log(this.data.record)
  },

    /**
   * 事件处理函数--确认按钮触发record上传
   */
  onClose() {
    this.setData({ show: false })
    // wx.request({
    //   url: ipstr + '/plan/process',
    //   method: "PUT",
    //   data: {
    //     userID: app.globalData.id,
    //     actionNum: this.data.index,
    //     actionSec: this.data.record
    //   }
    // })
    app.globalData.progressTime = this.data.record
    console.log(this.data.index + this.data.record)
    if (this.index === -1) {
      wx.navigateTo({
        url: '../train/train',
      })
    }
    else{
      wx.navigateTo({
        url: '../train/start.js',
      })
    }
  },
})