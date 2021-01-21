// pages/me/medetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateOfBirth: '',
    sex: '',
    height: '',
    weight: '',
    phoneNum: '',
    currentDateOfBirth: '暂无',
    currentSexIndex: 0,
    currentHeight: '暂无',
    currentWeight: '暂无',
    currentPhoneNum: '暂无',

    show: false,
    currentDate: new Date().getTime(),
    minDate: new Date(1900, 0, 1),
    maxDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.parse(options.obj))
    const sexDict = [{'sex': '未知'}, {'sex': '男'}, {'sex': '女'}]

    if (JSON.parse(options.obj).currentAge != null) {
      this.setData({
        currentAge: JSON.parse(options.obj).currentAge,
        newAge: JSON.parse(options.obj).currentAge
      })
    }
    if (JSON.parse(options.obj).currentSexIndex != null) {
      this.setData({
        currentSexIndex: JSON.parse(options.obj).currentSexIndex,
        currentSex: sexDict[JSON.parse(options.obj).currentSexIndex].sex,
        newSexIndex: JSON.parse(options.obj).currentSexIndex,
        newSex: sexDict[JSON.parse(options.obj).currentSexIndex].sex
      })
    }
    if (JSON.parse(options.obj).currentHeight != null) {
      this.setData({
        currentHeight: JSON.parse(options.obj).currentHeight,
        newHeight: JSON.parse(options.obj).currentHeight
      })
    }
    if (JSON.parse(options.obj).currentWeight != null) {
      this.setData({
        currentWeight: JSON.parse(options.obj).currentWeight,
        newWeight: JSON.parse(options.obj).currentWeight
      })
    }
    if (JSON.parse(options.obj).currentPhoneNum != null) {
      this.setData({
        currentPhoneNum: JSON.parse(options.obj).currentPhoneNum,
        newPhoneNum: JSON.parse(options.obj).currentPhoneNum
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
  
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  
  onChangeDateOfBirth(event) {
    var time = new Date(event.detail)
    var year = time.getFullYear();  // 获取完整的年份(4位,1970)
    var month = time.getMonth() + 1;  // 获取月份(0-11,0代表1月)
    var day = time.getDate();  // 获取日(1-31)
    var seperator = "/";
    this.setData({
      newDateOfBirth: year + seperator + month + seperator + day
    })
    this.setData({ show: false })
    console.log(this.data.newDateOfBirth);
  },

  onChangeSex(event) {
    console.log(event.detail);
    this.setData({
      newSex: event.detail
    })
    if (event.detail == "男") {
      this.data.newSexIndex = 1
    } else if (event.detail == "女") {
      this.data.newSexIndex = 2
    } else {
      this.data.newSexIndex = 0
      }
    console.log(this.data.newSexIndex);
  },

  onChangeHeight(event) {
    this.setData({
      newHeight: event.detail
    })
    console.log(this.data.newHeight);
  },

  onChangeWeight(event) {
    this.setData({
      newWeight: event.detail
    })
    console.log(this.data.newWeight);
  },

  onChangePhoneNum(event) {
    console.log(event.detail);
    this.setData({
      newPhoneNum: event.detail
    })
    console.log(this.data.newPhoneNum);
  },

  onClick() {
    wx.request({
      url: app.globalData.ipstr + '/user/info',
      method: "PUT",
      data: {
        userID: app.globalData.id,
        // userID: "wdyabcd",
        dateOfBirth: this.data.newDateOfBirth,
        sex: this.data.newSexIndex,
        height: this.data.newHeight,
        weight: this.data.newWeight,
        phoneNum: this.data.newPhoneNum
      },
      success: res => {
        console.log(res)
      }
    })

    wx.navigateBack({ changed: true })
  }  
})