// pages/train/start.js
const app = getApp()
const Exer = require('../../static/exer.js')
const exerDoc = Exer.exerDoc

Page({
  data: {
    flag: false, //按钮是否出现
    imgURL:"",
    exer:'', //动作名称
    n: 0, //动作次数
    sec: 0, //每个动作时间
    order: 0, //在方案中的序号+1
    start: '',
    process: '',
    note: '',
    muscle: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //解析参数
    let params = JSON.parse(options.obj)
    var flag = params.flag
    var name = params.exerName
    var order = params.index
    //根据动作名称找到动作内容
    var index = Exer.indexOf(name)
    var subs = exerDoc[index].time.split('：')[1].split(' ')[0]
    var n = exerDoc[index].set.split('：')[1]
    var sec = subs.substring(0, subs.length-1)
    this.setData({
      flag: flag,
      exer: name,
      n: n,
      sec: sec,
      order: order + 1,
      start: exerDoc[index].start,
      muscle: exerDoc[index].muscle,
      note: exerDoc[index].note,
      process: exerDoc[index].process,
      imgURL: exerDoc[index].url
    })
  },

  /**
   * 开始训练--传参至video：动作名称&flag
   */
  start: function () {
    wx.navigateTo({
      url: './video?obj=' + JSON.stringify({
        order: this.data.order,
        flag: this.data.flag,
        title: this.data.exer
      }),
    })
  }
})