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
    const sexDict = [{'sex': '未知'}, {'sex': '男'}, {'sex': '女'}]

    if (JSON.parse(options.obj).currentAge != null) {
      this.setData({
        ['detailList[0].current']: JSON.parse(options.obj).currentAge,
        ['detailList[0].new']: JSON.parse(options.obj).currentAge
      })
    }
    if (JSON.parse(options.obj).currentSexIndex != null) {
      this.setData({
        currentSexIndex: JSON.parse(options.obj).currentSexIndex,
        ['detailList[1].current']: sexDict[JSON.parse(options.obj).currentSexIndex].sex,
        newSexIndex: JSON.parse(options.obj).currentSexIndex,
        ['detailList[1].new']: sexDict[JSON.parse(options.obj).currentSexIndex].sex
      })
    }
    if (JSON.parse(options.obj).currentHeight != null) {
      this.setData({
        ['detailList[2].current']: JSON.parse(options.obj).currentHeight,
        ['detailList[2].new']: JSON.parse(options.obj).currentHeight
      })
    }
    if (JSON.parse(options.obj).currentWeight != null) {
      this.setData({
        ['detailList[3].current']: JSON.parse(options.obj).currentWeight,
        ['detailList[3].new']: JSON.parse(options.obj).currentWeight
      })
    }
    if (JSON.parse(options.obj).currentPhoneNum != null) {
      this.setData({
        ['detailList[4].current']: JSON.parse(options.obj).currentPhoneNum,
        ['detailList[4].new']: JSON.parse(options.obj).currentPhoneNum
      })
    }
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

    wx.request({
      url: app.globalData.ipstr + '/user/info',
      method: "PUT",
      data: {
        userID: app.globalData.id,
        // userID: "Coccccccyx",
        age: this.data.detailList[0].new,
        sex: this.data.newSexIndex,
        height: this.data.detailList[2].new,
        weight: this.data.detailList[3].new,
        phoneNum: this.data.detailList[4].new
      },
      success: res => {
        console.log(res)
      }
    })

    wx.navigateBack({ changed: true })

  },

  // onChange(event) {
  //   console.log(event.detail);
  //   let index = event.currentTarget.dataset.index;
  //   if (index == 1) {
  //     if (event.detail == "男") {
  //       this.data.newSexIndex = 1
  //     } else if (event.detail == "女") {
  //       this.data.newSexIndex = 2
  //     } else {
  //       this.data.newSexIndex = 0
  //     }
  //   } else {
  //     ['this.data.detailList[index].new'] = event.detail
  //   }
  // }
})