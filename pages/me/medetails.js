// pages/me/medetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailList: [
      {'title': 'age', 'text': '年龄', 'current':'暂无', 'new':'暂无'}, 
      {'title': 'sex', 'text': '性别', 'current':'暂无', 'new':'暂无'}, 
      {'title': 'height', 'text': '身高（cm）', 'current':'暂无', 'new':'暂无'}, 
      {'title': 'weight', 'text': '体重（kg）', 'current':'暂无', 'new':'暂无'}, 
      {'title': 'phoneNum', 'text': '手机号', 'current':'暂无', 'new':'暂无'}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.parse(options.obj))
    this.setData({
      ['detailList[0].current']: JSON.parse(options.obj).currentAge,
      ['detailList[1].current']: JSON.parse(options.obj).currentSex,
      ['detailList[2].current']: JSON.parse(options.obj).currentHeight,
      ['detailList[3].current']: JSON.parse(options.obj).currentWeight ,
      ['detailList[4].current']: JSON.parse(options.obj).currentPhoneNum,
      ['detailList[0].new']: JSON.parse(options.obj).currentAge,
      ['detailList[1].new']: JSON.parse(options.obj).currentSex,
      ['detailList[2].new']: JSON.parse(options.obj).currentHeight,
      ['detailList[3].new']: JSON.parse(options.obj).currentWeight ,
      ['detailList[4].new']: JSON.parse(options.obj).currentPhoneNum
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
   * 页面相关事件处理函数--监听用户下拉动作
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

  },
  
  onClick() {

    // wx.request({
    //   url: app.globalData.ipstr + '/user/info',
    //   method: "PUT",
    //   data: {
    //     userID: app.globalData.id,
    //     age: this.data.detailList[0].new,
    //     sex: this.data.detailList[1].new,
    //     height: this.data.detailList[2].new,
    //     weight: this.data.detailList[3].new,
    //     phoneNum: this.data.detailList[4].new
    //   }
    // })

    wx.navigateBack({ changed: true })

  },

  // onChange(event) {
  //   console.log(event.detail);
  //   let index = event.currentTarget.dataset.index;
  //   ['this.data.detailList[index].new'] = event.detail;
  // }
})