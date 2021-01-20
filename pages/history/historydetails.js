// pages/history/historydetails.js
const docu = require('../../static/docu.js')
const document = docu.plan
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    planName: '',
    list: [], //方案中的动作
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    var time = ''
    this.setData({
      time: JSON.parse(options.obj).year + '/' + JSON.parse(options.obj).month + '/' +JSON.parse(options.obj).day
    });
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

    // 拉取后端数据
    console.log(this.data.time),
    wx.request( {
      url: app.globalData.ipstr + "/plan/history",
      data:{
        userID: app.globalData.id,
        date: this.data.time
      },
      success: res => {
        this.setData({
          planID: res.data.data.planID
        }),
        console.log(res.data),
        console.log(this.data.planID)
      }
    })

    // var planIndex = 1 //api
    if (this.data.planID == null) {
      var planName = "无"
    }
    else{
      var planName = document[this.data.planID].title
      const exerDoc = docu.compose(planName)[0]
      var list = []
      for(let i=0; i<exerDoc.length; i++){
        list.push({
          step: exerDoc[i].step,
          title: exerDoc[i].title,
        })
      }
    }

    this.setData({
      planName: planName,
      list: list
    })
    
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
  exerDetail: function (e) {
    let index = e.currentTarget.dataset.index;
    console.log(this.data.list)
    wx.navigateTo({
      url: '../train/start?exer=' + this.data.list[index].title,
    })
  },

  /**
   * 监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})