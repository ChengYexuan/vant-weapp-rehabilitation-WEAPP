// pages/train/start.js

const exerDoc = require('../../static/exer.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    imgURL:"",
    exer:'',
    list:[],
    n: 0,
    sec: 0,
    order: 0,
    start: '',
    process: '',
    note: '',
    muscle: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = []
    for (let i = 0; i < exerDoc.length; i++) {
      list.push(exerDoc[i].title)
    }
    var flag = options.exer.charAt(options.exer.length-1)
    console.log(flag)
    if(!parseInt(flag)){
      var name = options.exer.substr(0, options.exer.length-1)
      this.setData({
        flag: false
      })
    }
    else{
      var name = options.exer.substr(0, options.exer.length-1)
      this.setData({
        flag: true
      })
    }
    var index = list.indexOf(name)
    var subs = exerDoc[index].time.split('：')[1].split(' ')[0]
    this.setData({
      exer: name,
      list: list,
      n: exerDoc[index].set.split('：')[1],
      sec: subs.substring(0, subs.length-1),
      order: index + 1,
      start: exerDoc[index].start,
      muscle: exerDoc[index].muscle,
      note: exerDoc[index].note,
      process: exerDoc[index].process,
      imgURL: exerDoc[index].url
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数
   */
  start: function () {
    wx.navigateTo({
      url: './video',
    })
  }
})