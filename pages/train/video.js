// pages/train/video.js
import Dialog from '@vant/weapp/dialog/dialog';
const Exer = require('../../static/exer.js')
const exerDoc = Exer.exerDoc
const app = getApp()

Page({
  data: {
    videoURL: '',
    title: '', //动作名称
    flag: false, //是否需要自动定位
    record: 0, //记录播放进度
    percent: 0,
    text: '', //提示信息
    gradientColor: {
      '0%': '#ffd01e',
      '100%': '#ee0a24',
    },
    show: false, //是否弹出对话框
    index: 0, //训练步骤
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let params = JSON.parse(options.obj)
    this.setData({
      videoURL: 'http://47.114.156.165:12306/videos/P' + app.globalData.serialNo + '/' + app.globalData.serialNo+ '-' + params.order  + '.mp4',
      flag: params.flag,
      title: params.title
    })
  },
 
  /**
   * 页面显示时--获取全局变量、自动定位视频进度
   */
  onShow: function () {
    this.setData({
      index: app.globalData.index,
      record: app.globalData.progressTime,
    })
    if(this.data.flag){
      this.videoContext = wx.createVideoContext('v')
      this.videoContext.seek(this.data.record)
    }
  },

  /**
   * 页面卸载时--上传record到后端
   */
  onUnload: function () {
    wx.request({
      url: app.globalData.ipstr + '/plan/process',
      method: "GET",
      data: {
        serialNo: app.globalData.serialNo,
        actionNum: this.data.index,
        actionSec: this.data.record
      },
      success: res => {
        console.log(res)
      }
    })
    app.globalData.progressTime = this.data.record
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
      this.setData({
        show: true
      })
      console.log(this.data.index)
      if (this.data.index === 4) {
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
  },

    /**
   * 事件处理函数--确认按钮触发record上传
   */
  onClose() {
    this.setData({ show: false })
    wx.request({
      url: app.globalData.ipstr + '/plan/process',
      method: "GET",
      data: {
        serialNo: app.globalData.serialNo,
        actionNum: this.data.index + 1,
        actionSec: 0
      },
      success: res => {
        console.log(res)
      }
    })
    app.globalData.progressTime = 0
    app.globalData.index = app.globalData.index+1
    if (this.data.index === 4) {
      wx.switchTab({
        url: '../train/train',
      })
    }
    else{
      wx.navigateTo({
        url: './start?obj=' + JSON.stringify({
          exerName: exerDoc[Exer.indexOf(this.data.title)+1].title,
          flag: true,
          index: this.data.index + 1 //下一步动作的序号
        })
      })
    }
  },
})